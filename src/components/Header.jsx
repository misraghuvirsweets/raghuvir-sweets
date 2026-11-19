import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { waLink } from '../utils/whatsapp.js';

const LINKS = [
  ['Home', '#home'],
  ['Specials & Offers', '#offers'],
  ['Mithai & Sweets', '#menu'],
  ['Bakery & Cakes', '#menu-bakery'],
  ['Gift Hampers', '#gifting'],
  ['Our Outlets', '#outlets'],
  ['Contact', '#contact'],
];

// With HashRouter, plain "#section" hrefs would change the route,
// so we scroll programmatically instead.
export function scrollToId(hash, onDone) {
  const id = hash.replace('#', '');
  if (id === 'menu-bakery') {
    window.dispatchEvent(new CustomEvent('menu:category', { detail: 'Fresh Cakes & Pastries' }));
  } else if (id === 'menu') {
    window.dispatchEvent(new CustomEvent('menu:category', { detail: 'All' }));
  }
  const el = document.getElementById(id === 'menu-bakery' ? 'menu' : id);
  el?.scrollIntoView({ behavior: 'smooth' });
  onDone?.();
}

export default function Header() {
  const { data } = useData();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wa = waLink(data.settings.whatsappNumber, `Namaste ${data.settings.shopName}! I'd like to place an order.`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-cream/90 backdrop-blur'
      } border-b border-amber-200/70`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button onClick={() => scrollToId('#home')} className="flex items-center gap-3 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-saffron bg-maroon font-serif text-xl font-bold text-amber-300">
            R
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold text-maroon md:text-xl">Raghuvir</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-saffron-dark">
              Sweets & Bakers
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-5 xl:flex">
          {LINKS.map(([label, href]) => (
            <button
              key={label}
              onClick={() => scrollToId(href)}
              className="text-sm font-medium text-stone-700 transition hover:text-saffron-dark"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={wa} target="_blank" rel="noreferrer" className="btn-wa hidden sm:inline-flex">
            <MessageCircle size={16} /> Order on WhatsApp
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-wa sm:hidden" aria-label="Order on WhatsApp">
            <MessageCircle size={18} />
          </a>
          <button
            className="rounded-lg p-2 text-maroon xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-amber-200 bg-white px-4 py-3 xl:hidden">
          {LINKS.map(([label, href]) => (
            <button
              key={label}
              onClick={() => scrollToId(href, () => setOpen(false))}
              className="block w-full rounded-lg px-3 py-2.5 text-left font-medium text-stone-700 hover:bg-amber-50 hover:text-saffron-dark"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
