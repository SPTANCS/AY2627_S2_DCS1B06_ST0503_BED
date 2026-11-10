import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Resolve the project root cross-platform (works on Windows, macOS, Linux).
// new URL('..', import.meta.url) steps up out of tests/, then fileURLToPath
// turns the file:// URL into a native path with the correct separators.
const root = fileURLToPath(new URL('..', import.meta.url));
const readJson = (relPath) => JSON.parse(readFileSync(join(root, relPath), 'utf8'));

describe('Section 2: project structure', () => {
  it('package.json declares ESM via "type": "module"', () => {
    const pkg = readJson('package.json');
    expect(pkg.type).toBe('module');
  });

  it('all five src/ layer folders exist', () => {
    for (const folder of [
      'src/data',
      'src/routes',
      'src/controllers',
      'src/utils',
      'src/middleware'
    ]) {
      expect(existsSync(join(root, folder)), `${folder} should exist`).toBe(true);
    }
  });

  it('express is a dependency', () => {
    const pkg = readJson('package.json');
    expect(pkg.dependencies).toHaveProperty('express');
  });
});
