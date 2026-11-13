import { createGameRecordRepository } from "../features/prod-canvas-game/prod-canvas-game.repo";
import type { GameRecordRepository } from "../features/prod-canvas-game/prod-canvas-game.repo";
import type { GameRecord } from "../features/prod-canvas-game/prod-canvas-game.types";

/**
 * Fixtures for the canvas game feature. The repository fixture is backed by a
 * real repository implementation so fixtures exercise the same code path as
 * the browser-origin storage.
 */
export function createMemoryStorage(initial: Record<string, string> = {}): Storage {
  const entries = new Map<string, string>(Object.entries(initial));
  const storage = {
    get length(): number {
      return entries.size;
    },
    clear(): void {
      entries.clear();
    },
    getItem(key: string): string | null {
      return entries.has(key) ? (entries.get(key) as string) : null;
    },
    key(index: number): string | null {
      const keys = Array.from(entries.keys());
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    removeItem(key: string): void {
      entries.delete(key);
    },
    setItem(key: string, value: string): void {
      entries.set(key, String(value));
    },
  };
  return storage as unknown as Storage;
}

export function createGameRecordRepositoryFixture(
  initial: Record<string, GameRecord> = {},
): GameRecordRepository {
  const seed: Record<string, string> = {};
  for (const [key, record] of Object.entries(initial)) {
    seed[key] = JSON.stringify(record);
  }
  return createGameRecordRepository(createMemoryStorage(seed));
}
