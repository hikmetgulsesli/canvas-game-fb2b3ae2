import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import {
  createInitialRuntimeState,
  rehydrateRuntimeState,
  toBridgeStates,
} from "../../game/game-runtime";
import { installTestBridge, uninstallTestBridge } from "../../test/bridge";
import type { SetfarmTestBridge } from "../../test/bridge";
import { createGameRecordRepository } from "./prod-canvas-game.repo";
import type { GameRecordRepository } from "./prod-canvas-game.repo";
import type { GameRuntimeSnapshot } from "./prod-canvas-game.types";
import { ACT_START_ACTION_REF, executeActStart, isActStartInvocation, resolveActionRef } from "../surf-play-page/act_start";

export interface ProdCanvasGameStoreValue {
  state: GameRuntimeSnapshot;
  /** Applies ACT_START (state deltas + persistence effect). */
  start: () => void;
  statusText: string;
  highScore: number | null;
}

const defaultStoreValue: ProdCanvasGameStoreValue = {
  state: createInitialRuntimeState(),
  start: () => undefined,
  statusText: "Ready to play",
  highScore: null,
};

const ProdCanvasGameStoreContext = createContext<ProdCanvasGameStoreValue>(defaultStoreValue);

export function ProdCanvasGameProvider({ children }: { children?: React.ReactNode }) {
  const repository = useMemo<GameRecordRepository>(() => createGameRecordRepository(), []);
  const [state, setState] = useState<GameRuntimeSnapshot>(() => createInitialRuntimeState());
  const stateRef = useRef<GameRuntimeSnapshot>(state);
  const bridgeRef = useRef<SetfarmTestBridge | null>(null);

  const applyState = useCallback((next: GameRuntimeSnapshot) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const start = useCallback(() => {
    const outcome = executeActStart(stateRef.current, repository);
    applyState(outcome.state);
  }, [applyState, repository]);

  // Evidence bridge installation (state bindings + action invocation).
  useEffect(() => {
    const bridge = installTestBridge({
      getStates: () => toBridgeStates(stateRef.current),
      invokeAction: (actionId: unknown) => {
        if (!isActStartInvocation(actionId)) {
          return { invoked: false, actionId: String(actionId) };
        }
        start();
        return { invoked: true, actionId: resolveActionRef(actionId) };
      },
    });
    bridgeRef.current = bridge;
    return () => {
      bridgeRef.current = null;
      uninstallTestBridge();
    };
  }, [start]);

  // Keep the bridge state bindings in sync with the live application state.
  useEffect(() => {
    const bridge = bridgeRef.current;
    if (!bridge) {
      return;
    }
    Object.assign(bridge.states, toBridgeStates(state));
  }, [state]);

  // Rehydration of STATE_HIGH_SCORE during initialization.
  useEffect(() => {
    const record = repository.read();
    if (!record) {
      return;
    }
    const hydrated = rehydrateRuntimeState(stateRef.current, record.high_score);
    if (hydrated === stateRef.current) {
      return;
    }
    applyState(hydrated);
  }, [applyState, repository]);

  const value = useMemo<ProdCanvasGameStoreValue>(
    () => ({
      state,
      start: () => {
        bridgeRef.current?.recordInvocation(ACT_START_ACTION_REF);
        start();
      },
      statusText: state.applicationState === "playing" ? "Game started" : "Ready to play",
      highScore: state.highScore,
    }),
    [state, start],
  );

  return (
    <ProdCanvasGameStoreContext.Provider value={value}>{children}</ProdCanvasGameStoreContext.Provider>
  );
}

export function useProdCanvasGameStore(): ProdCanvasGameStoreValue {
  return useContext(ProdCanvasGameStoreContext);
}
