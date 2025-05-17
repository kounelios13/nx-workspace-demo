import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CounterActions } from '../store/counter/counter.actions';
import { selectCount } from '../store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <h2>Counter</h2>
      <p>Current Count: {{ count$ | async }}</p>
      <div class="counter-buttons">
        <button (click)="increment()">Increment</button>
        <button (click)="decrement()">Decrement</button>
        <button (click)="reset()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .counter-container {
      text-align: center;
      padding: 20px;
    }
    .counter-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class CounterComponent {
  private readonly store = inject(Store);
  count$ = this.store.select(selectCount);

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
  }
}
