import { counterActions, counterReducer } from "./counterSlice";
import { CounterScheme } from "../types/counterScheme";

describe("counterSlice", () => {
  test("decrement", () => {
    const state: CounterScheme = { value: 10 };
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
  });
  test("increment", () => {
    const state: CounterScheme = { value: 10 };
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
  });
  test("should work with empty state", () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});
