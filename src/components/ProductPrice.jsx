import { formatInr, normalizeProductPrice } from '../utils/productPrice';
import './ProductPrice.css';

/** Renders API product prices. Safe to reuse later on the live Store catalog. */
export default function ProductPrice({ product, unit = '' }) {
  const { original, discountOn, percent, pay } = normalizeProductPrice(product);

  if (!discountOn) {
    return (
      <span className="pw-price">
        <strong>{formatInr(pay)}</strong>
        {unit ? <span className="pw-price-unit">{unit}</span> : null}
      </span>
    );
  }

  return (
    <span className="pw-price is-discounted">
      {percent > 0 && <span className="pw-off-badge">{percent}% off</span>}
      <strong>{formatInr(pay)}</strong>
      {unit ? <span className="pw-price-unit">{unit}</span> : null}
      <s>{formatInr(original)}</s>
    </span>
  );
}
