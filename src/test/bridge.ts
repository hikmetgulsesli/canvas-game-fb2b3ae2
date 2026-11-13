/**
 * Evidence bridge installed on the browser global for the runtime evidence
 * contract (setfarm.runtime-evidence-contract.v1).
 *
 * - globalName: __SETFARM_TEST_BRIDGE__
 * - actionInvocation.method: invokeAction
 * - scenarioMode: __SETFARM_SCENARIO_MODE__ = "manual"
 * - stateBindings: /states/STATE_APPLICATION_STATE, /states/STATE_HIGH_SCORE
 */

export const TEST_BRIDGE_GLOBAL_NAME = "__SETFARM_TEST_BRIDGE__";
export const SCENARIO_MODE_GLOBAL_NAME = "__SETFARM_SCENARIO_MODE__";
export const SCENARIO_MODE_VALUE = "manual";
export const ACTION_INVOCATION_METHOD = "invokeAction";

export interface ActionInvocationRecord {
  actionId: string;
  at: number;
}

export interface SetfarmTestBridge {
  states: Record<string, unknown>;
  invocations: ActionInvocationRecord[];
  invokeAction(actionId: unknown, payload?: unknown): unknown;
  recordInvocation(actionId: unknown): void;
}

export interface TestBridgeOptions {
  getStates: () => Record<string, unknown>;
  invokeAction: (actionId: unknown, payload?: unknown) => unknown;
}

type BridgeGlobal = typeof globalThis & {
  [TEST_BRIDGE_GLOBAL_NAME]?: SetfarmTestBridge;
  [SCENARIO_MODE_GLOBAL_NAME]?: string;
};

export function installTestBridge(options: TestBridgeOptions): SetfarmTestBridge {
  const bridge: SetfarmTestBridge = {
    states: { ...options.getStates() },
    invocations: [],
    invokeAction(actionId: unknown, payload?: unknown): unknown {
      bridge.recordInvocation(actionId);
      return options.invokeAction(actionId, payload);
    },
    recordInvocation(actionId: unknown): void {
      bridge.invocations.push({
        actionId: typeof actionId === "string" ? actionId : String(actionId),
        at: Date.now(),
      });
    },
  };

  const target = globalThis as BridgeGlobal;
  target[TEST_BRIDGE_GLOBAL_NAME] = bridge;
  target[SCENARIO_MODE_GLOBAL_NAME] = SCENARIO_MODE_VALUE;

  return bridge;
}

export function uninstallTestBridge(): void {
  const target = globalThis as BridgeGlobal;
  delete target[TEST_BRIDGE_GLOBAL_NAME];
  delete target[SCENARIO_MODE_GLOBAL_NAME];
}

export function getTestBridge(): SetfarmTestBridge | null {
  const target = globalThis as BridgeGlobal;
  return target[TEST_BRIDGE_GLOBAL_NAME] ?? null;
}
