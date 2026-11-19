/**
 * Compress an uploaded image (from PC or mobile camera) to a small
 * JPEG data-URL so it fits comfortably in LocalStorage.
 * To use Cloudinary/Firebase Storage instead, upload `file` there
 * and return the hosted URL from this function.
 */
export function compressImage(file, maxSize = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Unsupported image.'));
      img.onload = () => {
        let { width, height } = img;
        const scale = Math.min(1, maxSize / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#FEF3C7"/><circle cx="200" cy="140" r="60" fill="#F59E0B" opacity=".35"/><text x="200" y="250" font-family="Georgia" font-size="22" fill="#7F1D1D" text-anchor="middle">Raghuvir Sweets</text></svg>'
  );
