import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const writeQueues = new Map();

async function ensureArrayFile(filePath) {
  await mkdir(dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, 'utf8');
  } catch {
    await writeFile(filePath, '[]\n', 'utf8');
  }
}

export function appendJsonRecord(filePath, record) {
  const previous = writeQueues.get(filePath) || Promise.resolve();

  const next = previous
    .catch(() => undefined)
    .then(async () => {
      await ensureArrayFile(filePath);

      const raw = await readFile(filePath, 'utf8');
      const data = raw.trim() ? JSON.parse(raw) : [];

      if (!Array.isArray(data)) {
        throw new Error('Storage file must contain a JSON array.');
      }

      data.push(record);
      await writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    });

  writeQueues.set(filePath, next);
  return next;
}
