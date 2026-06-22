import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashbord-panel',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './dashbord-panel.html',
  styleUrl: './dashbord-panel.css',
})
export class DashbordPanel {
  @Input() meteoInfo: any;
}
