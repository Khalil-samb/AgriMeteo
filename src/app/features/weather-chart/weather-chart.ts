import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weather-chart',
  imports: [],
  templateUrl: './weather-chart.html',
  styleUrl: './weather-chart.css',
})
export class WeatherChart implements OnChanges, AfterViewInit {

  @Input() temperatureHistory: number[] = [];

  @ViewChild('chartCanvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;

  private viewReady = false;

  ngAfterViewInit() {

    this.viewReady = true;

    if (this.temperatureHistory.length) {
      this.createChart();
    }
  }

  ngOnChanges() {

    if (!this.viewReady) {
      return;
    }

    if (!this.temperatureHistory.length) {
      return;
    }

    this.createChart();
  }

  createChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(
      this.canvas.nativeElement,
      {
        type: 'line',
        data: {
          labels: ['-6j','-5j','-4j','-3j','-2j','-1j','Aujourd’hui'],
          datasets: [
            {
              label: 'Température',
              data: this.temperatureHistory,
              tension: 0.4
            }
          ]
        }
      }
    );
  }
}