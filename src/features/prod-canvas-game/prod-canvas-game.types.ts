/**
 * Canonical product types for the canvas game product spec.
 *
 * Identity references are copied verbatim from the closed ProductSpecV2
 * component for US-001 / ACT_START so that runtime code, the evidence bridge
 * and the persisted record all speak the same contract language.
 */

export const HIGH_SCORE_STORAGE_KEY = "setfarm.canvas_game.high_score_local_storage.v1";

export const GAME_RECORD_ENTITY_REF = "ENTITY_GAME_RECORD";
export const HIGH_SCORE_FIELD_REF = "FIELD_GAME_RECORD_HIGH_SCORE";

export const APPLICATION_STATE_REF = "STATE_APPLICATION_STATE";
export const HIGH_SCORE_STATE_REF = "STATE_HIGH_SCORE";

export const PERSIST_HIGH_SCORE_POLICY_REF = "PERSIST_HIGH_SCORE_LOCAL_STORAGE";

export type ApplicationState = "ready" | "playing";

/** Persisted game record entity (ENTITY_GAME_RECORD). */
export interface GameRecord {
  high_score: number;
}

/** Runtime snapshot of the two product states owned by this story. */
export interface GameRuntimeSnapshot {
  applicationState: ApplicationState;
  highScore: number | null;
}
