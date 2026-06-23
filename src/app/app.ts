import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  dateActuelle = new Date();

  constructor() {
    setInterval(() => {
      this.dateActuelle = new Date();
    }, 1000);
  }

}
