import { useState } from 'react';
import { Plus, Pencil, Trash2, CalendarClock } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { uid } from '../services/dataService.js';
import { isOfferLive, prettyDate } from '../utils/whatsapp.js';
import { FALLBACK_IMG } from '../utils/image.js';
import ImageInput from './ImageInput.jsx';
import { Modal, Toggle } from './ui.jsx';

const EMPTY = { title: '', subtitle: '', discountTag: '', expiry: '', active: true, image: '' };

export default function OffersManager({ notify }) {
  const { data, update } = useData();
  const [editing, setEditing] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    const item = editing;
    const res = await update((d) => ({
      ...d,
      offers: item.id ? d.offers.map((o) => (o.id === item.id ? item : o)) : [{ ...item, id: uid('f') }, ...d.offers],
    }));
    notify(res.ok ? 'Offer saved' : res.error, !res.ok);
    if (res.ok) setEditing(null);
  };

  const remove = async (o) => {
    if (!confirm(`Delete offer "${o.title}"?`)) return;
    const res = await update((d) => ({ ...d, offers: d.offers.filter((x) => x.id !== o.id) }));
    notify(res.ok ? 'Offer deleted' : res.error, !res.ok);
  };

  const toggle = (o) => update((d) => ({ ...d, offers: d.offers.map((x) => (x.id === o.id ? { ...x, active: !x.active } : x)) }));
  const f = (k) => (e) => setEditing({ ...editing, [k]: e.target.value });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-stone-600">Only <b>active</b> offers that haven't expired appear on the website.</p>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-gold shrink-0 !py-2"><Plus size={18} /> Add Offer</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.offers.map((o) => {
          const live = isOfferLive(o);
          return (
            <div key={o.id} className="card-lux overflow-hidden">
              <div className="relative h-36">
                <img src={o.image || FALLBACK_IMG} onError={(e) => (e.currentTarget.src = FALLBACK_IMG)} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-lg bg-saffron px-3 py-1 text-sm font-bold text-white">{o.discountTag || '—'}</span>
                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${live ? 'bg-emerald-600 text-white' : 'bg-stone-700 text-white'}`}>
                  {live ? 'LIVE' : o.active ? 'EXPIRED' : 'INACTIVE'}
                </span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-maroon">{o.title}</p>
                <p className="line-clamp-2 text-sm text-stone-600">{o.subtitle}</p>
                {o.expiry && <p className="mt-1 flex items-center gap-1 text-xs text-stone-500"><CalendarClock size={13} /> Till {prettyDate(o.expiry)}</p>}
                <div className="mt-3 flex items-center justify-between">
                  <Toggle checked={o.active} onChange={() => toggle(o)} label={o.active ? 'Active' : 'Inactive'} />
                  <div className="flex gap-1">
                    <button onClick={() => setEditing({ ...o })} className="rounded-lg p-2 text-saffron-dark hover:bg-amber-50"><Pencil size={16} /></button>
                    <button onClick={() => remove(o)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {!data.offers.length && <p className="col-span-full py-10 text-center text-stone-500">No offers yet.</p>}
      </div>

      {editing && (
        <Modal title={editing.id ? 'Edit Offer' : 'Add Offer'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><ImageInput value={editing.image} onChange={(image) => setEditing({ ...editing, image })} /></div>
            <div className="sm:col-span-2"><label className="label">Offer Title *</label><input required className="input" value={editing.title} onChange={f('title')} /></div>
            <div className="sm:col-span-2"><label className="label">Subtitle / Description</label><textarea rows={3} className="input" value={editing.subtitle} onChange={f('subtitle')} /></div>
            <div><label className="label">Discount Tag</label><input className="input" placeholder="20% OFF" value={editing.discountTag} onChange={f('discountTag')} /></div>
            <div><label className="label">Expiry Date</label><input type="date" className="input" value={editing.expiry} onChange={f('expiry')} /></div>
            <div className="sm:col-span-2"><Toggle checked={editing.active} onChange={(v) => setEditing({ ...editing, active: v })} label={editing.active ? 'Active' : 'Inactive'} /></div>
            <div className="flex gap-3 sm:col-span-2">
              <button type="button" onClick={() => setEditing(null)} className="btn-outline flex-1">Cancel</button>
              <button className="btn-gold flex-1">Save Offer</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
