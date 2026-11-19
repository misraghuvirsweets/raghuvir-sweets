import { useState } from 'react';
import { Gift, Heart, Cake, Building2, Send } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import SectionHeading from './SectionHeading.jsx';
import { waLink } from '../utils/whatsapp.js';

const TYPES = [
  [Heart, 'Wedding Boxes', 'Elegant shagun & mithai boxes for baraat, sangeet and return gifts.'],
  [Gift, 'Diwali & Festive Hampers', 'Curated sweets, dry fruits & diyas in premium packaging.'],
  [Building2, 'Corporate Gifting', 'Branded boxes for employees & clients, bulk pricing available.'],
  [Cake, 'Custom Celebration Cakes', 'Theme, photo & tiered cakes for birthdays and anniversaries.'],
];

export default function Gifting() {
  const { data } = useData();
  const [f, setF] = useState({ name: '', phone: '', type: 'Wedding Boxes', qty: '', date: '', notes: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Namaste ${data.settings.shopName}! 🙏\n*Bulk / Gifting Inquiry*\n` +
      `Name: ${f.name}\nPhone: ${f.phone}\nRequirement: ${f.type}\n` +
      `Quantity: ${f.qty || '-'}\nRequired by: ${f.date || '-'}\nDetails: ${f.notes || '-'}`;
    window.open(waLink(data.settings.whatsappNumber, msg), '_blank');
  };

  return (
    <section id="gifting" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Bulk Orders" title="Wedding, Festive & Corporate Gifting" subtitle="Make every occasion sweeter with custom boxes and hampers, made to order." />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {TYPES.map(([Icon, t, d]) => (
              <div key={t} className="card-lux p-5">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-saffron-dark">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-bold text-maroon">{t}</h3>
                <p className="mt-1 text-sm text-stone-600">{d}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-amber-300 bg-gradient-to-br from-cream to-amber-50 p-6 shadow-gold">
            <h3 className="text-2xl font-bold text-maroon">Quick Inquiry</h3>
            <p className="mb-5 text-sm text-stone-600">Fill this in and we'll continue the chat on WhatsApp.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label">Your Name *</label><input required className="input" value={f.name} onChange={set('name')} /></div>
              <div><label className="label">Phone *</label><input required type="tel" className="input" value={f.phone} onChange={set('phone')} /></div>
              <div>
                <label className="label">Requirement</label>
                <select className="input" value={f.type} onChange={set('type')}>
                  {TYPES.map(([, t]) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="label">Quantity / Boxes</label><input className="input" value={f.qty} onChange={set('qty')} placeholder="e.g. 150 boxes" /></div>
              <div className="sm:col-span-2"><label className="label">Required By</label><input type="date" className="input" value={f.date} onChange={set('date')} /></div>
              <div className="sm:col-span-2"><label className="label">Details</label><textarea rows={3} className="input" value={f.notes} onChange={set('notes')} placeholder="Budget, sweets preference, branding…" /></div>
            </div>
            <button className="btn-gold mt-5 w-full"><Send size={18} /> Send Inquiry on WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  );
}
