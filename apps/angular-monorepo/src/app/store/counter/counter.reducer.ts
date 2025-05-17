import { createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';
import { initialCounterState } from './counter.state';

export const counterReducer = createReducer(
  initialCounterState,
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1
  })),
  on(CounterActions.reset, (state) => ({
    ...state,
    count: 0
  })),
  on(CounterActions.setCount, (state, { count }) => ({
    ...state,
    count
  }))
);
