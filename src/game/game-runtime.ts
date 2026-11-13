import {
  APPLICATION_STATE_REF,
  HIGH_SCORE_STATE_REF,
} from "../features/prod-canvas-game/prod-canvas-game.types";
import type { GameRuntimeSnapshot } from "../features/prod-canvas-game/prod-canvas-game.types";

/**
 * Minimal game runtime: owns the two product states of this story and
 * projects them onto the evidence bridge state bindings.
 */

export function createInitialRuntimeState(): GameRuntimeSnapshot {
  return {
    applicationState: "ready",
    highScore: null,
  };
}

/**
 * Rehydration happens during initialization: a persisted game record seeds
 * STATE_HIGH_SCORE, otherwise the state keeps its initial (null) value.
 */
export function rehydrateRuntimeState(
  current: GameRuntimeSnapshot,
  persistedHighScore: number | null,
): GameRuntimeSnapshot {
  if (persistedHighScore === null) {
    return current;
  }
  return { ...current, highScore: persistedHighScore };
}

/** State bindings exposed through the evidence bridge (capture pointers). */
export function toBridgeStates(snapshot: GameRuntimeSnapshot): Record<string, unknown> {
  return {
    [APPLICATION_STATE_REF]: snapshot.applicationState,
    [HIGH_SCORE_STATE_REF]: snapshot.highScore,
  };
}
