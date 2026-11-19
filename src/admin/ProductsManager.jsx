import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { CATEGORIES, UNITS, BADGES } from '../data/defaultData.js';
import { uid } from '../services/dataService.js';
import { formatINR } from '../utils/whatsapp.js';
import { FALLBACK_IMG } from '../utils/image.js';
import ImageInput from './ImageInput.jsx';
import { Modal, Toggle } from './ui.jsx';

const EMPTY = { name: '', category: CATEGORIES[0], price: '', unit: 'per kg', description: '', badge: 'None', inStock: true, image: '' };

export default function ProductsManager({ notify }) {
  const { data, update } = useData();
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const list = data.products.filter(
    (p) => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())
  );

  const save = async (e) => {
    e.preventDefault();
    const item = { ...editing, price: Number(editing.price) || 0 };
    const res = await update((d) => ({
      ...d,
      products: item.id ? d.products.map((p) => (p.id === item.id ? item : p)) : [{ ...item, id: uid('p') }, ...d.products],
    }));
    notify(res.ok ? 'Product saved' : res.error, !res.ok);
    if (res.ok) setEditing(null);
  };

  const remove = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const res = await update((d) => ({ ...d, products: d.products.filter((x) => x.id !== p.id) }));
    notify(res.ok ? 'Product deleted' : res.error, !res.ok);
  };

  const toggleStock = (p) =>
    update((d) => ({ ...d, products: d.products.map((x) => (x.id === p.id ? { ...x, inStock: !x.inStock } : x)) }));

  const f = (k) => (e) => setEditing({ ...editing, [k]: e.target.value });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[180px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input className="input pl-9" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="input !w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-gold !py-2"><Plus size={18} /> Add Product</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className="card-lux flex gap-3 p-3">
            <img src={p.image || FALLBACK_IMG} onError={(e) => (e.currentTarget.src = FALLBACK_IMG)} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-maroon">{p.name}</p>
              <p className="truncate text-xs text-stone-500">{p.category}</p>
              <p className="text-sm font-medium">₹{formatINR(p.price)} <span className="text-xs text-stone-500">{p.unit}</span></p>
              <div className="mt-1 flex items-center justify-between">
                <Toggle checked={p.inStock} onChange={() => toggleStock(p)} />
                <div className="flex gap-1">
                  <button onClick={() => setEditing({ ...p })} className="rounded-lg p-2 text-saffron-dark hover:bg-amber-50" aria-label="Edit"><Pencil size={16} /></button>
                  <button onClick={() => remove(p)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!list.length && <p className="col-span-full py-10 text-center text-stone-500">No products found.</p>}
      </div>

      {editing && (
        <Modal title={editing.id ? 'Edit Product' : 'Add Product'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><ImageInput value={editing.image} onChange={(image) => setEditing({ ...editing, image })} /></div>
            <div className="sm:col-span-2"><label className="label">Item Name *</label><input required className="input" value={editing.name} onChange={f('name')} /></div>
            <div><label className="label">Category</label>
              <select className="input" value={editing.category} onChange={f('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div><label className="label">Badge</label>
              <select className="input" value={editing.badge} onChange={f('badge')}>{BADGES.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div><label className="label">Price (₹) *</label><input required type="number" min="0" className="input" value={editing.price} onChange={f('price')} /></div>
            <div><label className="label">Unit</label>
              <select className="input" value={editing.unit} onChange={f('unit')}>{UNITS.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div className="sm:col-span-2"><label className="label">Description</label><textarea rows={3} className="input" value={editing.description} onChange={f('description')} /></div>
            <div className="sm:col-span-2"><Toggle checked={editing.inStock} onChange={(v) => setEditing({ ...editing, inStock: v })} label={editing.inStock ? 'In Stock' : 'Out of Stock'} /></div>
            <div className="flex gap-3 sm:col-span-2">
              <button type="button" onClick={() => setEditing(null)} className="btn-outline flex-1">Cancel</button>
              <button className="btn-gold flex-1">Save Product</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
