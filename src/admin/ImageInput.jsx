import { useRef, useState } from 'react';
import { Upload, Link2, Loader2, X } from 'lucide-react';
import { compressImage, FALLBACK_IMG } from '../utils/image.js';

// Upload from PC / phone camera (compressed) OR paste an image URL, with live preview.
export default function ImageInput({ value, onChange }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const isData = value?.startsWith('data:');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErr('');
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="label">Photo</label>
      <div className="flex gap-3">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
          {value ? (
            <>
              <img src={value} onError={(e) => (e.currentTarget.src = FALLBACK_IMG)} alt="preview" className="h-full w-full object-cover" />
              <button type="button" onClick={() => onChange('')} className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"><X size={12} /></button>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-stone-400">No image</div>
          )}
          {busy && <div className="absolute inset-0 flex items-center justify-center bg-white/70"><Loader2 className="animate-spin text-saffron" /></div>}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline !justify-start !rounded-lg !px-3 !py-2 !text-sm">
            <Upload size={16} /> Upload from device
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
          <div className="relative">
            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              className="input pl-8"
              placeholder="…or paste image URL"
              value={isData ? '' : value || ''}
              onChange={(e) => onChange(e.target.value.trim())}
            />
          </div>
          {isData && <p className="text-[11px] text-emerald-700">✓ Uploaded & compressed ({Math.round((value.length * 0.75) / 1024)} KB)</p>}
          {err && <p className="text-[11px] text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}
