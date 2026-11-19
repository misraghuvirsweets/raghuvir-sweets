import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { uid } from '../services/dataService.js';

export default function SettingsManager({ notify }) {
  const { data, update } = useData();
  const [s, setS] = useState(() => JSON.parse(JSON.stringify(data.settings)));

  const set = (k) => (e) => setS({ ...s, [k]: e.target.value });
  const setOutlet = (i, k) => (e) => {
    const outlets = [...s.outlets];
    outlets[i] = { ...outlets[i], [k]: e.target.value };
    setS({ ...s, outlets });
  };

  const save = async (e) => {
    e.preventDefault();
    const res = await update((d) => ({ ...d, settings: { ...s, whatsappNumber: s.whatsappNumber.replace(/\D/g, '') } }));
    notify(res.ok ? 'Settings saved' : res.error, !res.ok);
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="card-lux p-5">
        <h3 className="mb-4 text-lg font-bold text-maroon">Store & Contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">WhatsApp Order Number *</label>
            <input required className="input" value={s.whatsappNumber} onChange={set('whatsappNumber')} placeholder="919876543210" />
            <p className="mt-1 text-[11px] text-stone-500">Country code + number, e.g. 91 then 10 digits.</p>
          </div>
          <div><label className="label">Email</label><input className="input" value={s.email} onChange={set('email')} /></div>
          <div><label className="label">Shop Name</label><input className="input" value={s.shopName} onChange={set('shopName')} /></div>
          <div><label className="label">FSSAI Licence No.</label><input className="input" value={s.fssai} onChange={set('fssai')} /></div>
          <div className="sm:col-span-2"><label className="label">Tagline</label><input className="input" value={s.tagline} onChange={set('tagline')} /></div>
          <div><label className="label">Instagram URL</label><input className="input" value={s.instagram} onChange={set('instagram')} /></div>
          <div><label className="label">Facebook URL</label><input className="input" value={s.facebook} onChange={set('facebook')} /></div>
          <div><label className="label">YouTube URL</label><input className="input" value={s.youtube} onChange={set('youtube')} /></div>
        </div>
      </div>

      {s.outlets.map((o, i) => (
        <div key={o.id} className="card-lux p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-maroon">Outlet {i + 1}</h3>
            {s.outlets.length > 1 && (
              <button type="button" onClick={() => setS({ ...s, outlets: s.outlets.filter((_, k) => k !== i) })} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Outlet Name</label><input className="input" value={o.name} onChange={setOutlet(i, 'name')} /></div>
            <div><label className="label">Phone</label><input className="input" value={o.phone} onChange={setOutlet(i, 'phone')} /></div>
            <div className="sm:col-span-2"><label className="label">Address</label><textarea rows={2} className="input" value={o.address} onChange={setOutlet(i, 'address')} /></div>
            <div><label className="label">Timings</label><input className="input" value={o.timings} onChange={setOutlet(i, 'timings')} /></div>
            <div><label className="label">Google Maps Link</label><input className="input" value={o.mapsUrl} onChange={setOutlet(i, 'mapsUrl')} /></div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setS({ ...s, outlets: [...s.outlets, { id: uid('o'), name: `Outlet ${s.outlets.length + 1}`, address: '', timings: '', phone: '', mapsUrl: '' }] })} className="btn-outline">
          <Plus size={18} /> Add Outlet
        </button>
        <button className="btn-gold"><Save size={18} /> Save Settings</button>
      </div>
    </form>
  );
}
