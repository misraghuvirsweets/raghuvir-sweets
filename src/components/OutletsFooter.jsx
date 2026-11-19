import { MapPin, Clock, Phone, Navigation, Instagram, Facebook, Youtube, Mail, ShieldCheck, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import SectionHeading from './SectionHeading.jsx';
import { waLink } from '../utils/whatsapp.js';
import Logo from './Logo.jsx';

export default function OutletsFooter() {
  const { data } = useData();
  const s = data.settings;
  return (
    <>
      <section id="outlets" className="pattern-bg py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="Visit Us" title="Our Outlets" subtitle="Walk in for fresh mithai, warm bakes and a sweet welcome." />
          <div className="grid gap-6 md:grid-cols-2">
            {s.outlets.map((o) => (
              <div key={o.id} className="card-lux relative overflow-hidden p-6">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-amber-100 to-transparent" />
                <h3 className="relative text-xl font-bold text-maroon">{o.name}</h3>
                <ul className="relative mt-4 space-y-3 text-sm text-stone-700">
                  <li className="flex gap-3"><MapPin className="shrink-0 text-saffron" size={18} />{o.address}</li>
                  <li className="flex gap-3"><Clock className="shrink-0 text-saffron" size={18} />{o.timings}</li>
                  <li className="flex gap-3"><Phone className="shrink-0 text-saffron" size={18} /><a href={`tel:${o.phone.replace(/\s/g, '')}`} className="hover:text-saffron-dark">{o.phone}</a></li>
                </ul>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {o.mapsUrl && (
                    <a href={o.mapsUrl} target="_blank" rel="noreferrer" className="btn-outline !px-4 !py-2 !text-sm"><Navigation size={15} /> Get Directions</a>
                  )}
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="btn-gold !px-4 !py-2 !text-sm"><Phone size={15} /> Call</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-maroon-dark text-amber-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12 bg-white p-0.5" />
              <div>
                <p className="font-serif text-xl font-bold text-white">Raghuvir</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300">Sweets & Bakers</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-amber-100/70">{s.tagline}. Pure ghee mithai, Bengali sweets and freshly baked cakes made with love every day.</p>
            <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-amber-400/40 bg-white/5 px-4 py-3">
              <ShieldCheck className="text-emerald-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">FSSAI Licensed</p>
                <p className="text-xs text-amber-100/70">Lic. No. {s.fssai}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="flex items-center gap-2 hover:text-amber-300" href={waLink(s.whatsappNumber, 'Namaste! I have a query.')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp: +{s.whatsappNumber}</a></li>
              {s.email && <li><a className="flex items-center gap-2 hover:text-amber-300" href={`mailto:${s.email}`}><Mail size={16} /> {s.email}</a></li>}
              {s.outlets.map((o) => (
                <li key={o.id}><a className="flex items-center gap-2 hover:text-amber-300" href={`tel:${o.phone.replace(/\s/g, '')}`}><Phone size={16} /> {o.phone}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Follow Us</h4>
            <div className="flex gap-3">
              {[[Instagram, s.instagram], [Facebook, s.facebook], [Youtube, s.youtube]].filter(([, u]) => u).map(([Icon, u], k) => (
                <a key={k} href={u} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/40 transition hover:bg-saffron hover:text-white"><Icon size={18} /></a>
              ))}
            </div>
            <p className="mt-6 text-sm text-amber-100/70">Order ahead on WhatsApp for festivals – we get busy!</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-amber-100/60">
          © {new Date().getFullYear()} {s.shopName}. All rights reserved. ·{' '}
          <Link to="/admin" className="hover:text-amber-300">Admin</Link>
        </div>
      </footer>

      <a
        href={waLink(s.whatsappNumber, `Namaste ${s.shopName}! I'd like to place an order.`)}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
