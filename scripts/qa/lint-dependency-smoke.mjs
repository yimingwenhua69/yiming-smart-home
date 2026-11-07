import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const parser = require('@typescript-eslint/parser');
const estreeRequire = createRequire(require.resolve('@typescript-eslint/typescript-estree'));
const minimatchPackage = JSON.parse(readFileSync(estreeRequire.resolve('minimatch/package.json'), 'utf8'));
assert.equal(minimatchPackage.version, '11.0.1');

// Exercise the consumer API affected by the scoped override, including exclusion.
const code = readFileSync('eslint.config.mjs', 'utf8');
const options = {
  filePath: `${process.cwd()}/eslint.config.mjs`,
  tsconfigRootDir: process.cwd(),
  projectService: { allowDefaultProject: ['eslint.config.mjs'] },
};
try {
  assert(parser.parseForESLint(code, options).services.program);
  parser.clearCaches();
  assert.throws(() => parser.parseForESLint(code, {
    ...options,
    projectService: { allowDefaultProject: ['not-the-config.mjs'] },
  }));
} finally {
  parser.clearCaches();
}
console.log('Scoped minimatch 11 override: TypeScript ESLint project-service inclusion/exclusion passed');
