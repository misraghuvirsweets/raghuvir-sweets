import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarClock, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import SectionHeading from './SectionHeading.jsx';
import { waLink, offerMessage, isOfferLive, prettyDate } from '../utils/whatsapp.js';
import { FALLBACK_IMG } from '../utils/image.js';

export default function Offers() {
  const { data } = useData();
  const offers = data.offers.filter(isOfferLive);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (offers.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % offers.length), 6000);
    return () => clearInterval(t);
  }, [offers.length]);

  if (!offers.length) return null;
  const idx = i % offers.length;

  return (
    <section id="offers" className="bg-gradient-to-b from-maroon to-maroon-dark py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading light eyebrow="Live Now" title="Festive Offers & Combos" subtitle="Limited-time specials, fresh from our kitchen." />

        <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 shadow-2xl">
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {offers.map((o) => (
              <div key={o.id} className="grid w-full shrink-0 bg-white md:grid-cols-2">
                <div className="relative h-60 md:h-auto md:min-h-[340px]">
                  <img
                    src={o.image || FALLBACK_IMG}
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    alt={o.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rotate-[-4deg] rounded-xl bg-gradient-to-r from-saffron to-saffron-dark px-4 py-2 font-serif text-xl font-bold text-white shadow-lg">
                    {o.discountTag}
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
                  <h3 className="text-2xl font-bold text-maroon md:text-3xl">{o.title}</h3>
                  <p className="text-stone-600">{o.subtitle}</p>
                  {o.expiry && (
                    <p className="flex items-center gap-2 text-sm font-medium text-saffron-dark">
                      <CalendarClock size={16} /> Valid till {prettyDate(o.expiry)}
                    </p>
                  )}
                  <a
                    href={waLink(data.settings.whatsappNumber, offerMessage(o, data.settings.shopName))}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa w-fit !px-6 !py-3 !text-base"
                  >
                    <MessageCircle size={18} /> Claim on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {offers.length > 1 && (
            <>
              <button onClick={() => setI((idx - 1 + offers.length) % offers.length)} className="absolute left-2 top-28 rounded-full bg-white/90 p-2 text-maroon shadow md:top-1/2 md:-translate-y-1/2" aria-label="Previous offer">
                <ChevronLeft />
              </button>
              <button onClick={() => setI((idx + 1) % offers.length)} className="absolute right-2 top-28 rounded-full bg-white/90 p-2 text-maroon shadow md:top-1/2 md:-translate-y-1/2" aria-label="Next offer">
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {offers.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {offers.map((o, k) => (
              <button key={o.id} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40'}`} aria-label={`Offer ${k + 1}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
