/**
 * Admin credentials.
 * Change these before deploying, or set them in a `.env` file:
 *   VITE_ADMIN_ID=owner
 *   VITE_ADMIN_PASSWORD=MySecret@123
 *
 * NOTE: On a static site (GitHub Pages) this login only keeps casual
 * visitors out — the data itself lives in each browser's LocalStorage.
 * For real multi-device security, connect Firebase/Supabase auth in
 * src/services/dataService.js.
 */
export const ADMIN_ID = import.meta.env.VITE_ADMIN_ID || 'admin';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'raghuvir@123';
export const SESSION_KEY = 'raghuvir_admin_session';
