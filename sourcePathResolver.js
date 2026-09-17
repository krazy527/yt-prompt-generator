import path from 'node:path';

export function resolveDownloadedSourcePath(baseDir, files = [], guessedPath = '') {
  const names = (Array.isArray(files) ? files : [])
    .map((file) => (typeof file === 'string' ? file : file?.name))
    .filter(Boolean);

  if (!names.length) {
    return guessedPath || null;
  }

  const guessedFileName = guessedPath ? path.basename(guessedPath) : '';
  const guessedBaseName = guessedPath ? path.basename(guessedPath, path.extname(guessedPath)) : '';

  if (guessedFileName && names.includes(guessedFileName)) {
    return guessedPath;
  }

  const fallbackMatch = names.find((name) => {
    const normalized = name.toLowerCase();
    const guessedLower = guessedBaseName.toLowerCase();

    if (!guessedLower) {
      return normalized.startsWith('source-') || normalized.endsWith('.mp4') || normalized.endsWith('.webm');
    }

    return (
      normalized === `${guessedLower}.mp4` ||
      normalized.startsWith(`${guessedLower}.`) ||
      normalized.startsWith(`${guessedLower}-`) ||
      normalized === guessedLower
    );
  });

  return fallbackMatch ? path.join(baseDir, fallbackMatch) : null;
}
