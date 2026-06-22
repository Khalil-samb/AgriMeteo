import { Component, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { ListRegions } from './features/list-regions/list-regions';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AgriMeteo');
}
