import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const studioDir = path.join(rootDir, 'sanity-studio');
const command = process.argv[2] ?? 'build';

function parseEnvFile(contents) {
  const env = {};

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    env[key] = value;
  }

  return env;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const values = parseEnvFile(fs.readFileSync(filePath, 'utf8'));
  for (const [key, value] of Object.entries(values)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(rootDir, '.env.local'));
loadEnvFile(path.join(rootDir, '.env'));
loadEnvFile(path.join(studioDir, '.env'));

process.env.SANITY_STUDIO_PROJECT_ID ??= process.env.SANITY_PROJECT_ID;
process.env.SANITY_STUDIO_DATASET ??= process.env.SANITY_DATASET;

const result = process.platform === 'win32'
  ? spawnSync('cmd.exe', ['/d', '/s', '/c', `npm --prefix sanity-studio run ${command}`], {
      cwd: rootDir,
      env: process.env,
      stdio: 'inherit',
    })
  : spawnSync('npm', ['--prefix', 'sanity-studio', 'run', command], {
      cwd: rootDir,
      env: process.env,
      stdio: 'inherit',
    });

if (result.error) {
  console.error(result.error.message);
}

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(1);
