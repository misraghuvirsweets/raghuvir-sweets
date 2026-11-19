import { Sparkles, ShieldCheck, Leaf, Award } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { scrollToId } from './Header.jsx';

const HERO_IMG =
  'https://images.unsplash.com/photo-1601303516534-bf4d4a7ec1e9?auto=format&fit=crop&w=1800&q=75';

export default function Hero() {
  const { data } = useData();
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Traditional Indian sweets" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/95 via-maroon/80 to-maroon/30" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-20">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/50 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-200 backdrop-blur">
          <Sparkles size={14} /> Pure Ghee · Freshly Made Daily
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          {data.settings.shopName.split(' and ')[0]}
          <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-saffron bg-clip-text text-transparent">
            Sweets & Bakers
          </span>
        </h1>
        <p className="mt-5 max-w-xl font-serif text-xl italic text-amber-100 md:text-2xl">
          “{data.settings.tagline}”
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => scrollToId('#menu')} className="btn-gold">Explore Menu</button>
          <button
            onClick={() => scrollToId('#offers')}
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-200 px-6 py-3 font-medium text-amber-100 transition hover:bg-amber-200 hover:text-maroon"
          >
            View Today's Offers
          </button>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 text-amber-100">
          {[
            [ShieldCheck, 'FSSAI Certified', 'Hygienic kitchen'],
            [Leaf, '100% Pure Ghee', 'No compromise'],
            [Award, 'Since Generations', 'Family recipes'],
          ].map(([Icon, t, s]) => (
            <div key={t} className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur">
              <Icon className="mb-1 text-amber-300" size={20} />
              <p className="text-xs font-semibold sm:text-sm">{t}</p>
              <p className="text-[10px] text-amber-100/70 sm:text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
