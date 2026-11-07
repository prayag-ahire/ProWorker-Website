import { authService } from './authService';
import { normalizeProduct } from '../utils/productPrice';

const CLIENT_API = 'https://api.proworker.co/api/v1/client';

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const authHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = authService.getToken?.();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

async function clientGet(path, { auth = false } = {}) {
  const response = await fetch(`${CLIENT_API}${path}`, {
    method: 'GET',
    headers: auth ? authHeaders() : { 'Content-Type': 'application/json' },
  });
  const data = await parseJson(response);
  if (!response.ok) {
    const error = new Error(data?.message || `API error: ${response.status}`);
    error.status = response.status;
    error.body = data;
    throw error;
  }
  return data;
}

const unwrapList = (payload, key) => {
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

export const clientCatalog = {
  /** Public worker list. `id` is the user id used by getWorkerProfile. */
  listWorkers: async ({ page = 1, limit = 50 } = {}) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    const data = await clientGet(`/workers?${params}`);
    return {
      page: data.page || page,
      limit: data.limit || limit,
      total: data.total || 0,
      totalPages: data.totalPages || 1,
      workers: unwrapList(data, 'workers').map((worker) => ({
        id: worker.id,
        name: worker.name,
        profession: worker.profession,
        image: worker.image,
        rating: worker.rating,
        price: worker.price,
        offeringType: worker.offeringType,
        distanceKm: worker.distance_km,
      })),
    };
  },

  /** Profile. `:id` is the user id from listWorkers, not the website find-workers record id. */
  getWorkerProfile: async (userId) => {
    const data = await clientGet(`/worker/${userId}`);
    const root = data?.data && !data.username ? data.data : data;
    return {
      id: root.id ?? userId,
      name: root.username || root.name,
      imageUrl: root.ImgURL || root.imageUrl,
      isOnline: root.isOnline,
      rating: root.Rating ?? root.rating,
      description: root.Description || root.description,
      chargesPerVisit: root.Charges_PerVisit ?? root.charges_per_visit,
      offeringType: root.offeringType,
      profession: root.professionRel?.name || root.profession,
      products: (root.products || []).map(normalizeProduct),
      workImages: root.worker_image || [],
      reviews: root.textReviews || [],
      seller: root.user ? { mobile: root.user.mobile_no } : null,
      raw: root,
    };
  },

  searchProducts: async (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, value]) => value !== undefined && value !== null && value !== '')
          .map(([key, value]) => [key, String(value)])
      )
    );
    const suffix = query.toString() ? `?${query}` : '';
    const data = await clientGet(`/products/search${suffix}`);
    const page = data.data || data;
    return {
      page: page.page || 1,
      limit: page.limit || 10,
      total: page.total || 0,
      totalPages: page.totalPages || 1,
      products: unwrapList(data, 'products').map(normalizeProduct),
    };
  },

  getProduct: async (productId) => {
    let data;
    try {
      data = await clientGet(`/product/${productId}`);
    } catch (error) {
      if (error.status !== 404) throw error;
      data = await clientGet(`/products/${productId}`);
    }
    const item = data?.data || data;
    return normalizeProduct(item);
  },

  getSavedProducts: async () => {
    try {
      const data = await clientGet('/saved-products', { auth: true });
      return unwrapList(data, 'products').map(normalizeProduct);
    } catch {
      return [];
    }
  },

  /**
   * Website find-workers `id` is the worker record id.
   * Profile/products need the user id. Try record id first, then match seller name.
   */
  getProductsForSearchWorker: async (worker) => {
    const tried = new Set();
    const candidates = [worker.userId, worker.id].filter((id) => id !== undefined && id !== null && id !== '');

    for (const id of candidates) {
      const key = String(id);
      if (tried.has(key)) continue;
      tried.add(key);
      try {
        const profile = await clientCatalog.getWorkerProfile(id);
        if (profile?.products?.length) return profile.products;
        if (profile?.offeringType) return profile.products || [];
      } catch {
        // Record id often differs from user id for PRODUCT sellers.
      }
    }

    const target = String(worker.name || '').trim().toLowerCase();
    if (!target) return [];

    const { products } = await clientCatalog.searchProducts({ limit: 50 });
    const details = await Promise.all(
      products.map((item) => clientCatalog.getProduct(item.id).catch(() => null))
    );
    return details.filter((detail) => {
      const sellerName = String(detail?.seller?.name || '').trim().toLowerCase();
      return Boolean(detail && sellerName && sellerName === target);
    });
  },
};
