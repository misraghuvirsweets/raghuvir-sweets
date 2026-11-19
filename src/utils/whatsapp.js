export const cleanNumber = (n = '') => String(n).replace(/\D/g, '');

export function waLink(number, message) {
  return `https://wa.me/${cleanNumber(number)}?text=${encodeURIComponent(message)}`;
}

export const productMessage = (p, shop) =>
  `Namaste ${shop}! 🙏\nI'd like to order:\n• ${p.name} – ₹${p.price} ${p.unit}\n\nQuantity: \nPickup / Delivery: \nName: `;

export const offerMessage = (o, shop) =>
  `Namaste ${shop}! 🙏\nI'd like to claim the offer: *${o.title}* (${o.discountTag}).\nPlease share details.`;

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Number(n) || 0);

export const isOfferLive = (o) => {
  if (!o.active) return false;
  if (!o.expiry) return true;
  const end = new Date(o.expiry + 'T23:59:59');
  return end >= new Date();
};

export const prettyDate = (d) =>
  d ? new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
