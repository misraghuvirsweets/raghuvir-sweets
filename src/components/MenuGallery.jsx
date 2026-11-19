import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Search, Flame, Sparkles, Star } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import SectionHeading from './SectionHeading.jsx';
import { CATEGORIES } from '../data/defaultData.js';
import { waLink, productMessage, formatINR } from '../utils/whatsapp.js';
import { FALLBACK_IMG } from '../utils/image.js';

const BADGE_STYLE = {
  Bestseller: ['bg-maroon text-amber-200', Flame],
  'Fresh Today': ['bg-emerald-600 text-white', Sparkles],
  New: ['bg-saffron text-white', Star],
};

export default function MenuGallery() {
  const { data } = useData();
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');

  useEffect(() => {
    const h = (e) => setCat(e.detail);
    window.addEventListener('menu:category', h);
    return () => window.removeEventListener('menu:category', h);
  }, []);

  const items = useMemo(
    () =>
      data.products.filter(
        (p) => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())
      ),
    [data.products, cat, q]
  );

  return (
    <section id="menu" className="pattern-bg py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Our Menu" title="Mithai, Bakery & More" subtitle="Handcrafted every morning with pure ingredients. Tap any item to order instantly on WhatsApp." />

        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 md:flex-wrap md:justify-center">
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                cat === c
                  ? 'border-saffron bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-gold'
                  : 'border-amber-200 bg-white text-stone-700 hover:border-saffron'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sweets, cakes, snacks…" className="input !rounded-full !py-2.5 pl-10" />
        </div>

        {items.length === 0 ? (
          <p className="py-12 text-center text-stone-500">No items found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => {
              const badge = BADGE_STYLE[p.badge];
              const BadgeIcon = badge?.[1];
              return (
                <article key={p.id} className="card-lux group flex flex-col overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-amber-50">
                    <img
                      src={p.image || FALLBACK_IMG}
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {badge && (
                      <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow ${badge[0]}`}>
                        <BadgeIcon size={11} /> {p.badge}
                      </span>
                    )}
                    {!p.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-maroon">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-saffron-dark">{p.category}</p>
                    <h3 className="mt-1 font-serif text-base font-bold text-maroon sm:text-lg">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 hidden text-xs text-stone-500 sm:block">{p.description}</p>
                    <p className="mt-2 text-lg font-semibold text-stone-900">
                      ₹{formatINR(p.price)} <span className="text-xs font-normal text-stone-500">{p.unit}</span>
                    </p>
                    <div className="mt-auto pt-3">
                      {p.inStock ? (
                        <a href={waLink(data.settings.whatsappNumber, productMessage(p, data.settings.shopName))} target="_blank" rel="noreferrer" className="btn-wa w-full !text-xs sm:!text-sm">
                          <MessageCircle size={15} /> Order on WhatsApp
                        </a>
                      ) : (
                        <button disabled className="w-full cursor-not-allowed rounded-full bg-stone-200 py-2 text-xs text-stone-500">
                          Currently unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
