import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, test } from '@jest/globals';
import type * as Undici from 'undici';

const projectRequire = createRequire(__filename);

function consumerRequire(...chain: string[]) {
  let current = projectRequire;
  for (const name of chain) {
    current = createRequire(current.resolve(name));
  }
  return current;
}

test('Istanbul reads a synthetic YAML configuration through its own loader', async () => {
  const fixture = mkdtempSync(join(tmpdir(), 'discord-dependency-'));
  const loader = projectRequire('@istanbuljs/load-nyc-config') as {
    loadNycConfig(options: { cwd: string; nycrcPath: string }): Promise<unknown>;
  };
  try {
    writeFileSync(join(fixture, 'package.json'), '{}');
    writeFileSync(join(fixture, '.nycrc.yml'), 'all: true\ninclude: ["src/**/*.ts"]\n');
    await expect(
      loader.loadNycConfig({
        cwd: fixture,
        nycrcPath: join(fixture, '.nycrc.yml'),
      })
    ).resolves.toMatchObject({ all: true, include: ['src/**/*.ts'] });
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('the Istanbul YAML loader counts empty merge sources against its budget', () => {
  const yaml = consumerRequire('@istanbuljs/load-nyc-config')('js-yaml') as {
    load(source: string, options: { maxTotalMergeKeys: number }): unknown;
  };

  expect(() =>
    yaml.load('source: &source [{}, {}, {}]\ntarget:\n  <<: *source\n', {
      maxTotalMergeKeys: 1,
    })
  ).toThrow();
});

test.each([
  ['eslint', 'minimatch'],
  ['glob', 'minimatch'],
  ['test-exclude', 'minimatch'],
  ['test-exclude', 'glob', 'minimatch'],
])('brace expansion works through the %s consumer chain', (...chain) => {
  const parent = consumerRequire(...chain.slice(0, -1));
  const minimatch = parent(chain[chain.length - 1]) as {
    braceExpand(pattern: string): string[];
  };

  expect(minimatch.braceExpand('src/{wanted,jumpit}/index.{ts,js}')).toEqual([
    'src/wanted/index.ts',
    'src/wanted/index.js',
    'src/jumpit/index.ts',
    'src/jumpit/index.js',
  ]);
});

test('Serverless loads the Undici ProxyAgent API without installing or running a binary', async () => {
  const fromServerless = createRequire(projectRequire.resolve('serverless/binary.js'));
  const undici = fromServerless('undici') as typeof Undici;
  const binary = projectRequire('serverless/binary.js') as { install: unknown; run: unknown };
  expect(typeof binary.install).toBe('function');
  expect(typeof binary.run).toBe('function');

  const agent = new undici.ProxyAgent('http://proxy.example.invalid');
  await agent.close();

  const mock = new undici.MockAgent();
  mock.disableNetConnect();
  mock
    .get('https://example.invalid')
    .intercept({ path: '/fixture', method: 'GET' })
    .reply(200, { ok: true });
  try {
    const response = await undici.request('https://example.invalid/fixture', { dispatcher: mock });
    expect(response.statusCode).toBe(200);
    await expect(response.body.json()).resolves.toEqual({ ok: true });
    mock.assertNoPendingInterceptors();
  } finally {
    await mock.close();
  }
});
