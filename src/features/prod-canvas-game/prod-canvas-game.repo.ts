import { HIGH_SCORE_STORAGE_KEY } from "./prod-canvas-game.types";
import type { GameRecord } from "./prod-canvas-game.types";

/**
 * Browser-origin repository for ENTITY_GAME_RECORD.
 *
 * The persistence policy (PERSIST_HIGH_SCORE_LOCAL_STORAGE) is owned by the
 * application and stores the game record under a single origin key with
 * "reload" durability, rehydrated during initialization.
 */
export interface GameRecordRepository {
  read(): GameRecord | null;
  write(record: GameRecord): void;
  clear(): void;
}

function resolveDefaultStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function createGameRecordRepository(
  storage: Storage | null = resolveDefaultStorage(),
): GameRecordRepository {
  return {
    read(): GameRecord | null {
      if (!storage) {
        return null;
      }
      try {
        const raw = storage.getItem(HIGH_SCORE_STORAGE_KEY);
        if (raw === null) {
          return null;
        }
        const parsed = JSON.parse(raw) as { high_score?: unknown } | null;
        if (!parsed || typeof parsed.high_score !== "number" || !Number.isFinite(parsed.high_score)) {
          return null;
        }
        return { high_score: parsed.high_score };
      } catch {
        return null;
      }
    },
    write(record: GameRecord): void {
      if (!storage) {
        return;
      }
      try {
        storage.setItem(
          HIGH_SCORE_STORAGE_KEY,
          JSON.stringify({ high_score: record.high_score }),
        );
      } catch {
        /* storage is unavailable: the runtime keeps working in memory only */
      }
    },
    clear(): void {
      if (!storage) {
        return;
      }
      try {
        storage.removeItem(HIGH_SCORE_STORAGE_KEY);
      } catch {
        /* nothing to clean up */
      }
    },
  };
}
