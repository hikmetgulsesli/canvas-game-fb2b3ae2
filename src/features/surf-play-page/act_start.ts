import type { GameRecordRepository } from "../prod-canvas-game/prod-canvas-game.repo";
import type { GameRecord, GameRuntimeSnapshot } from "../prod-canvas-game/prod-canvas-game.types";

/**
 * ACT_START — the user trigger bound to the start button control slot
 * (CSLOT_START_START_BUTTON) on SURF_PLAY_PAGE.
 *
 * Contract (closed ProductSpecV2 component for US-001):
 *  - STATE_APPLICATION_STATE := "playing"
 *  - STATE_HIGH_SCORE        := 0
 *  - navigation: stay on the current route
 *  - persistence: write ENTITY_GAME_RECORD through
 *    PERSIST_HIGH_SCORE_LOCAL_STORAGE
 */
export const ACT_START_ACTION_REF = "ACT_START";
export const START_GENERATED_LOCAL_ID = "start-1";

export interface ActStartOutcome {
  state: GameRuntimeSnapshot;
  persistedRecord: GameRecord;
}

export function executeActStart(
  current: GameRuntimeSnapshot,
  repository: GameRecordRepository,
): ActStartOutcome {
  const nextState: GameRuntimeSnapshot = {
    applicationState: "playing",
    highScore: 0,
  };

  const persistedRecord: GameRecord = {
    high_score: nextState.highScore === null ? 0 : nextState.highScore,
  };

  repository.write(persistedRecord);

  return { state: nextState, persistedRecord };
}

/** The action is invokable by its action ref or by its generated local id. */
export function resolveActionRef(actionId: unknown): string | null {
  if (typeof actionId === "string") {
    return actionId;
  }
  if (actionId && typeof actionId === "object") {
    const candidate = actionId as { actionRef?: unknown; actionId?: unknown; id?: unknown };
    const refs = [candidate.actionRef, candidate.actionId, candidate.id];
    for (const ref of refs) {
      if (typeof ref === "string") {
        return ref;
      }
    }
  }
  return null;
}

export function isActStartInvocation(actionId: unknown): boolean {
  const ref = resolveActionRef(actionId);
  return ref === ACT_START_ACTION_REF || ref === START_GENERATED_LOCAL_ID;
}
