export function validateSlideCount(count) {
  const MAX_SLIDES = parseInt(process.env.MAX_SLIDES || 100);
  return Math.min(Math.max(count, 1), MAX_SLIDES);
}

export function formatDate(date) {
  return date.toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function extractFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

export function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .toLowerCase();
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}