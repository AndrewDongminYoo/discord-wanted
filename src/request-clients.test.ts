import { afterAll, afterEach, beforeAll, beforeEach, expect, jest, test } from '@jest/globals';
import axios, { AxiosError, type AxiosAdapter } from 'axios';

import type { fetchSaraminJobs as saraminFetcher } from '../jumpit/index.js';
import type { fetchJobs as wantedFetcher } from '../wanted/index.js';
import type { InstallGlobalCommands } from './utils.js';

jest.mock('dotenv', () => ({ config: jest.fn() }));

const adapter = jest.fn<AxiosAdapter>();
const originalAdapter = axios.defaults.adapter;
let fetchJobs: typeof wantedFetcher;
let fetchSaraminJobs: typeof saraminFetcher;
let installCommands: typeof InstallGlobalCommands;

beforeAll(async () => {
  // Every Axios instance inherits this in-memory transport before it is created.
  axios.defaults.adapter = adapter;
  process.env.DISCORD_TOKEN = 'synthetic-test-token';
  ({ fetchJobs } = await import('../wanted/index.js'));
  ({ fetchSaraminJobs } = await import('../jumpit/index.js'));
  ({ InstallGlobalCommands: installCommands } = await import('./utils.js'));
});

beforeEach(() => {
  adapter.mockReset();
});
afterEach(() => {
  jest.restoreAllMocks();
});
afterAll(() => {
  axios.defaults.adapter = originalAdapter;
  delete process.env.DISCORD_TOKEN;
});

function respondWith(data: unknown) {
  adapter.mockImplementation(async (config) => ({
    config,
    data,
    headers: {},
    status: 200,
    statusText: 'OK',
  }));
}

test('Wanted requests retain their URL, timeout, headers, and result mapping', async () => {
  respondWith({
    data: [
      {
        id: 123,
        company: { id: 456, name: 'Synthetic Company' },
        position: 'Engineer',
        address: { location: 'Seoul', district: 'Test District' },
        annual_from: 0,
        annual_to: 3,
        is_newbie: true,
      },
    ],
  });

  const jobs = await fetchJobs([], [], 'seoul.all');

  expect(jobs[0].usefulInfo()).toMatchObject({
    company: 'Synthetic Company',
    position: 'Engineer',
    jobInfoLink: 'https://www.wanted.co.kr/wd/123',
  });
  expect(adapter).toHaveBeenCalledTimes(1);
  expect(adapter.mock.calls[0][0]).toMatchObject({
    baseURL: 'https://www.wanted.co.kr',
    method: 'get',
    timeout: 10000,
    withCredentials: true,
    url: '/api/chaos/navigation/v1/results?job_sort=job.recommend_order&job_group_id=518&country=kr&locations=seoul.all&limit=10',
  });
  expect(adapter.mock.calls[0][0].headers.get('wanted-user-country')).toBe('KR');
});

test('Wanted propagates an Axios transport failure', async () => {
  const error = new AxiosError('Synthetic timeout', AxiosError.ETIMEDOUT);
  adapter.mockRejectedValue(error);

  await expect(fetchJobs([], [], '')).rejects.toBe(error);
});

test('Saramin requests retain their query and result mapping', async () => {
  respondWith({
    result: {
      positions: [
        {
          id: 789,
          companyName: 'Synthetic Company',
          title: 'Developer',
          locations: ['Seoul'],
          minCareer: 0,
          maxCareer: 3,
        },
      ],
    },
  });

  const jobs = await fetchSaraminJobs({ career: '0', techStack: ['Java', 'Spring'] });

  expect(jobs[0].usefulInfo()).toMatchObject({
    company: 'Synthetic Company',
    position: 'Developer',
    jobInfoLink: 'https://jumpit.saramin.co.kr/position/789',
  });
  expect(adapter.mock.calls[0][0]).toMatchObject({
    baseURL: 'https://jumpit-api.saramin.co.kr',
    method: 'get',
    timeout: 10000,
    url: '/api/positions?career=0&techStack=Java&techStack=Spring&sort=popular',
  });
});

test('Saramin propagates an Axios transport failure', async () => {
  const error = new AxiosError('Synthetic timeout', AxiosError.ETIMEDOUT);
  const log = jest.spyOn(console, 'error').mockImplementation(() => {});
  adapter.mockRejectedValue(error);

  await expect(fetchSaraminJobs({ techStack: [] })).rejects.toBe(error);
  expect(log).toHaveBeenCalledWith('Error fetching Saramin jobs:', error);
});

test('registration constructs an authenticated PUT without sending a request', async () => {
  respondWith([]);

  await installCommands('synthetic-application', []);

  const config = adapter.mock.calls[0][0];
  expect(config.url).toBe(
    'https://discord.com/api/v10/applications/synthetic-application/commands'
  );
  expect(config.method).toBe('put');
  expect(config.data).toBe('[]');
  expect(config.headers.get('Authorization')).toBe('Bot synthetic-test-token');
  expect(config.headers.get('Content-Type')).toBe('application/json; charset=UTF-8');
});

test('the default Axios method ignores inherited prototype values', async () => {
  respondWith({});
  const original = Object.getOwnPropertyDescriptor(Object.prototype, 'method');
  Object.defineProperty(Object.prototype, 'method', {
    value: 'delete',
    configurable: true,
    writable: true,
  });

  try {
    await axios.request({ url: 'https://example.invalid', adapter });
  } finally {
    if (original) {
      Object.defineProperty(Object.prototype, 'method', original);
    } else {
      Reflect.deleteProperty(Object.prototype, 'method');
    }
  }

  expect(adapter.mock.calls[0][0].method).toBe('get');
});
