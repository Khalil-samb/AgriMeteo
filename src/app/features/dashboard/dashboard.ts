import { Component } from '@angular/core';
import { CardMap } from '../map/card-map/card-map';
import { ListRegions } from '../list-regions/list-regions';
import { DashbordPanel } from '../dashbord-panel/dashbord-panel';
import { StatsCards } from '../stats-cards/stats-cards';
import { WeatherChart } from '../weather-chart/weather-chart';

@Component({
  selector: 'app-dashboard',
  imports: [CardMap, ListRegions, DashbordPanel, WeatherChart, StatsCards],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
  selectedWeather: any = null;
  onWeatherSelected(event: any) {

    this.selectedWeather = event;

  }
}
