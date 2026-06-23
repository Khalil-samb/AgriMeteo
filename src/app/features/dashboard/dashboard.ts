import { Component } from '@angular/core';
import { CardMap } from '../map/card-map/card-map';
import { ListRegions } from '../list-regions/list-regions';
import { DashbordPanel } from '../dashbord-panel/dashbord-panel';
import { WeatherChart } from '../weather-chart/weather-chart';
import { generateTemperatureHistory } from '../../utils/HistoryTemp';

@Component({
  selector: 'app-dashboard',
  imports: [CardMap, ListRegions, DashbordPanel, WeatherChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
  selectedWeather: any = null;
  selectedRegionKey: string | null = null;

  historiqueTemp: number[] = [];

  onWeatherSelected(event: any) {

    this.selectedWeather = event;

    this.selectedRegionKey = event.regionKey

    this.historiqueTemp = generateTemperatureHistory(event.weather.main.temp);

  }
}
