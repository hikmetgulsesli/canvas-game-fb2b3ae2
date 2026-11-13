import { defineConfig } from 'vitest/config';

const nodeRuntime = (globalThis as {
  process?: { allowedNodeEnvironmentFlags?: { has(flag: string): boolean } };
}).process;
const browserWorkerArgs = nodeRuntime?.allowedNodeEnvironmentFlags?.has('--no-experimental-webstorage')
  ? ['--no-experimental-webstorage'] : [];

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    pool: 'forks',
    poolOptions: { forks: { execArgv: browserWorkerArgs } },
    maxWorkers: 1,
    minWorkers: 1,
    fileParallelism: false,
    isolate: false,
    teardownTimeout: 1000,
  },
});
