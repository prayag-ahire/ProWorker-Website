import { normalizeMobile } from './authService';

const BASE_API_URL = 'https://api.proworker.co/api';
const PARTNERS_API_URL = `${BASE_API_URL.replace(/\/$/, '')}/v1/partners`;
// Partner OTP routes are not live yet; reuse the working client OTP SMS endpoints.
const OTP_API_URL = `${BASE_API_URL.replace(/\/$/, '')}/v1/client/login/otp`;

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const getErrorMessage = (data, fallback) =>
  data?.message || data?.error || data?.data?.message || fallback;

const buildReferralCode = (city = '') => {
  const cityPart = String(city || 'IND')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 3)
    .toUpperCase() || 'IND';
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `PW-${cityPart}-${suffix}`;
};

const buildRegisterBody = (payload) => {
  const mobileNumber = normalizeMobile(payload.mobileNumber || payload.mobile);

  if (mobileNumber.length !== 10) {
    throw new Error('Enter a valid 10-digit mobile number');
  }

  const body = {
    fullName: String(payload.fullName || '').trim(),
    mobileNumber,
    state: String(payload.state || '').trim(),
    city: String(payload.city || '').trim(),
    area: String(payload.area || '').trim(),
    preferredWorkingArea: String(payload.preferredWorkingArea || '').trim(),
    salesExperience: payload.salesExperience || 'none',
    upiId: String(payload.upiId || `${mobileNumber}@upi`).trim(),
    agreementAccepted: Boolean(payload.agreementAccepted),
  };

  if (!body.fullName || body.fullName.length < 3) {
    throw new Error('Please enter your full name (at least 3 characters).');
  }

  if (!body.city || !body.area || !body.preferredWorkingArea) {
    throw new Error('Please complete city, area, and preferred working area.');
  }

  if (!body.agreementAccepted) {
    throw new Error('You must accept all program terms before registering.');
  }

  return body;
};

const provisionalRegistration = (body) => ({
  success: true,
  provisional: true,
  message: 'Partner application saved. Your provisional referral code is ready.',
  partnerId: `local_${body.mobileNumber}_${Date.now()}`,
  referralCode: buildReferralCode(body.city),
  mobileNumber: body.mobileNumber,
  upiId: body.upiId,
});

export const partnerService = {
  /**
   * Send real SMS OTP via the live client OTP endpoint.
   * (Partner-specific OTP API is not deployed yet.)
   */
  sendOtp: async (mobile) => {
    const mobileNumber = normalizeMobile(mobile);

    if (mobileNumber.length !== 10) {
      throw new Error('Enter a valid 10-digit mobile number');
    }

    const response = await fetch(OTP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile: mobileNumber }),
    });

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(getErrorMessage(data, 'Failed to send OTP'));
    }

    const otpId = data.OTPID ?? data.otpId ?? data.otpID;

    if (otpId === undefined || otpId === null || String(otpId).trim() === '') {
      throw new Error('OTP was sent but no session id was returned. Please try again.');
    }

    return {
      success: true,
      message: data.message || 'OTP sent successfully',
      otpId,
      OTPID: otpId,
      mobileNumber,
    };
  },

  /**
   * Verify SMS OTP via the live client OTP endpoint.
   * Does not persist a website login session (partner signup only).
   */
  verifyOtp: async ({ otpId, otp }) => {
    if (otpId === undefined || otpId === null || String(otpId).trim() === '') {
      throw new Error('OTP session expired. Please request a new code.');
    }

    const trimmedOtp = String(otp || '').trim();
    if (!trimmedOtp || trimmedOtp.length < 4) {
      throw new Error('Enter the OTP sent to your mobile number');
    }

    const response = await fetch(`${OTP_API_URL}/Verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTPID: String(otpId),
        OTP: trimmedOtp,
      }),
    });

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(getErrorMessage(data, 'OTP verification failed'));
    }

    return {
      success: true,
      message: data.message || 'Mobile verified successfully',
      ...data,
    };
  },

  /**
   * Submit partner registration.
   * Uses POST /api/v1/partners/register when available; otherwise issues a provisional code.
   */
  register: async (payload) => {
    const body = buildRegisterBody(payload);

    let response;
    try {
      response = await fetch(`${PARTNERS_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch {
      // Backend unreachable — allow provisional completion after OTP verify.
      return provisionalRegistration(body);
    }

    const data = await parseJson(response);

    if (response.ok) {
      const result = data.data || data;
      return {
        success: true,
        provisional: false,
        message: data.message || 'Partner registration received.',
        partnerId: result.partnerId ?? result.partner_id ?? data.partnerId,
        otpId: result.otpId ?? result.otpID ?? result.OTPID ?? data.otpId,
        referralCode: result.referralCode ?? result.referral_code ?? data.referralCode,
        mobileNumber: body.mobileNumber,
        upiId: body.upiId,
      };
    }

    // Partner API not deployed yet.
    if (response.status === 404) {
      return provisionalRegistration(body);
    }

    throw new Error(getErrorMessage(data, 'Failed to register as Growth Partner'));
  },
};
