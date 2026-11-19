import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Tag, Store, DatabaseBackup, LogOut, ExternalLink } from 'lucide-react';
import Login from '../admin/Login.jsx';
import ProductsManager from '../admin/ProductsManager.jsx';
import OffersManager from '../admin/OffersManager.jsx';
import SettingsManager from '../admin/SettingsManager.jsx';
import BackupManager from '../admin/BackupManager.jsx';
import { Toast } from '../admin/ui.jsx';
import { SESSION_KEY } from '../admin/config.js';
import Logo from '../components/Logo.jsx';

const TABS = [
  ['products', 'Products', Package, ProductsManager],
  ['offers', 'Offers & Banners', Tag, OffersManager],
  ['settings', 'Outlets & Contact', Store, SettingsManager],
  ['backup', 'Backup / Export', DatabaseBackup, BackupManager],
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [tab, setTab] = useState('products');
  const [toast, setToast] = useState(null);

  const notify = (msg, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast(null), 2600);
  };

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  const [, title, , Panel] = TABS.find((t) => t[0] === tab);

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-amber-200 bg-maroon text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 bg-white p-0.5" />
            <div>
              <p className="font-serif text-lg font-bold leading-tight">Admin Dashboard</p>
              <p className="text-[11px] text-amber-200">Raghuvir Sweets and Bakers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="hidden items-center gap-1 rounded-full border border-amber-300/50 px-3 py-1.5 text-sm hover:bg-white/10 sm:flex">
              <ExternalLink size={14} /> View Site
            </Link>
            <button onClick={logout} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 space-y-1">
            {TABS.map(([id, label, Icon]) => (
              <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${tab === id ? 'bg-gradient-to-r from-saffron to-saffron-dark text-white shadow-gold' : 'text-stone-700 hover:bg-amber-100'}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <h1 className="mb-5 text-2xl font-bold text-maroon md:text-3xl">{title}</h1>
          <Panel key={tab} notify={notify} />
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-amber-200 bg-white md:hidden">
        {TABS.map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${tab === id ? 'text-saffron-dark' : 'text-stone-500'}`}>
            <Icon size={20} /> {label.split(' ')[0]}
          </button>
        ))}
      </nav>

      <Toast toast={toast} />
    </div>
  );
}
