/** Shared helpers for public product APIs. Do not wire this into the mock Store catalog. */

export const formatInr = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

export const isProductOffering = (value) => String(value || '').toUpperCase() === 'PRODUCT';

export const isRentListing = (value) => String(value || '').toUpperCase() === 'RENT';

/**
 * Normalize the four discount fields from any product payload.
 * When discount is false, pay === original.
 * When discount is true, pay comes from discountedPrice.
 */
export function normalizeProductPrice(product = {}) {
  const original = Number(product.price) || 0;
  const discountOn = product.discount === true || product.discount === 'true';
  const percent = Number(product.discountPercentage) || 0;
  const rawPay = product.discountedPrice;
  const hasPay = rawPay !== undefined && rawPay !== null && rawPay !== '';
  const pay = hasPay ? Number(rawPay) : original;

  return {
    original,
    discountOn,
    percent,
    pay: discountOn ? pay : original,
  };
}

export function normalizeProduct(product = {}) {
  const images = Array.isArray(product.images)
    ? product.images.map((item) => (typeof item === 'string' ? item : item?.img_URL)).filter(Boolean)
    : [];
  const image = product.image || images[0] || '';
  const listingType = String(product.listingType || 'SELLING').toUpperCase();

  return {
    id: String(product.id ?? ''),
    name: product.name || product.title || 'Product',
    description: product.description || '',
    listingType,
    status: product.status || '',
    image,
    images: images.length ? images : image ? [image] : [],
    seller: product.seller || null,
    price: product.price,
    discount: product.discount,
    discountPercentage: product.discountPercentage,
    discountedPrice: product.discountedPrice,
    ...normalizeProductPrice(product),
  };
}
