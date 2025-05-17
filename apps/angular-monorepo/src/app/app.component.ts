import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './components/counter.component';

@Component({
  standalone: true,
  imports: [RouterModule, CounterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-monorepo';
}
