import { useRef } from 'react';
import { Download, Upload, RotateCcw, Database, Info } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import { exportData, parseImport, storageUsageKB } from '../services/dataService.js';

export default function BackupManager({ notify }) {
  const { data, replaceAll, reset } = useData();
  const fileRef = useRef(null);

  const onImport = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const parsed = parseImport(await file.text());
      if (!confirm(`Import ${parsed.products.length} products and ${parsed.offers.length} offers? Current data will be replaced.`)) return;
      const res = await replaceAll(parsed);
      notify(res.ok ? 'Data imported successfully' : res.error, !res.ok);
    } catch (x) {
      notify(x.message || 'Invalid file', true);
    }
  };

  const onReset = async () => {
    if (!confirm('Reset ALL website data to the original sample content? Export a backup first!')) return;
    await reset();
    notify('Website reset to default data');
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {[['Products', data.products.length], ['Offers', data.offers.length], ['Storage used', `${storageUsageKB()} KB`]].map(([l, v]) => (
          <div key={l} className="card-lux p-5">
            <p className="text-xs uppercase tracking-wide text-stone-500">{l}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-maroon">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-lux p-6">
          <Download className="mb-2 text-saffron" />
          <h3 className="text-lg font-bold text-maroon">Export Website Data</h3>
          <p className="mb-4 text-sm text-stone-600">Download all products, offers and settings as a JSON backup file.</p>
          <button onClick={() => { exportData(data); notify('Backup downloaded'); }} className="btn-gold"><Download size={18} /> Export JSON</button>
        </div>
        <div className="card-lux p-6">
          <Upload className="mb-2 text-saffron" />
          <h3 className="text-lg font-bold text-maroon">Import Data</h3>
          <p className="mb-4 text-sm text-stone-600">Restore a backup, or copy data from another device/browser.</p>
          <button onClick={() => fileRef.current?.click()} className="btn-outline"><Upload size={18} /> Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={onImport} className="hidden" />
        </div>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-stone-700">
        <p className="mb-2 flex items-center gap-2 font-semibold text-maroon"><Info size={16} /> How data is stored</p>
        <p>
          Changes are saved in <b>this browser's local storage</b>. Customers on other phones will see the
          <b> default data</b> bundled in the site until you publish your changes. To publish for everyone:
          Export JSON → replace <code className="rounded bg-white px-1">src/data/site-data.json</code> in the
          project → push to GitHub (see README). For live, instant sync across all devices, connect Firebase or
          Supabase in <code className="rounded bg-white px-1">src/services/dataService.js</code>.
        </p>
      </div>

      <div className="card-lux flex flex-wrap items-center justify-between gap-3 border-red-200 p-5">
        <div className="flex items-center gap-3">
          <Database className="text-red-500" />
          <div>
            <p className="font-semibold text-stone-800">Reset to default</p>
            <p className="text-xs text-stone-500">Clears local edits and restores the published data.</p>
          </div>
        </div>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-full border-2 border-red-500 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white">
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
