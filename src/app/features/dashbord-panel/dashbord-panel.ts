import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { calculateRisk, RiskResult } from '../../utils/riskCalculate';

@Component({
  selector: 'app-dashbord-panel',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './dashbord-panel.html',
  styleUrl: './dashbord-panel.css',
})
export class DashbordPanel implements OnChanges {
  @Input() meteoInfo: any;

  risque!: RiskResult;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.meteoInfo) {
      console.log("Aucune donnee recu");
      return
    }
    
    this.risque = calculateRisk(this.meteoInfo.weather.main.temp, this.meteoInfo.weather.main.humidity);
  }
}
