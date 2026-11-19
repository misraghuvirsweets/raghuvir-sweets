import { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADMIN_ID, ADMIN_PASSWORD, SESSION_KEY } from './config.js';

export default function Login({ onSuccess }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (id.trim() === ADMIN_ID && pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onSuccess();
    } else {
      setErr('Incorrect Admin ID or password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-maroon-dark via-maroon to-saffron-dark p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-amber-300 bg-cream p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-saffron bg-maroon font-serif text-3xl font-bold text-amber-300">R</span>
          <h1 className="mt-4 text-2xl font-bold text-maroon">Admin Panel</h1>
          <p className="text-sm text-stone-500">Raghuvir Sweets and Bakers</p>
        </div>
        <label className="label">Admin ID</label>
        <div className="relative mb-4">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input className="input pl-9" value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" autoFocus />
        </div>
        <label className="label">Password / PIN</label>
        <div className="relative mb-2">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input className="input px-9" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {err && <p className="mb-2 text-sm text-red-600">{err}</p>}
        <button className="btn-gold mt-4 w-full">Login</button>
        <Link to="/" className="mt-5 flex items-center justify-center gap-1 text-sm text-stone-500 hover:text-saffron-dark">
          <ArrowLeft size={14} /> Back to website
        </Link>
      </form>
    </div>
  );
}
