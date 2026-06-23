import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MeteoService } from '../../../services/weather.service';
import { REGIONS } from '../../../data/regions.data';

@Component({
  selector: 'app-card-map',
  imports: [],
  standalone:true,
  templateUrl: './card-map.html',
  styleUrl: './card-map.css',
})
export class CardMap {
  // Événement émis lorsqu'une région est sélectionnée
  @Output() weatherSelected = new EventEmitter<any>();

  @Input() activeRegion: string | null = null; // ← reçoit la synchro du parent

  // selectedRegion!: string;

  serviceMeteo = inject(MeteoService)
  
  onRegionClick(svgId: string) {
    // this.selectedRegion = svgId

    const region = REGIONS.find(r => r.id === svgId);

    if (!region) {
      console.log("region n'existe pas");
      return
    }

    this.serviceMeteo.getMeteo(region.lat, region.lon).subscribe({
        next: (data) => {

          // console.log(data);

          this.weatherSelected.emit({
            regionKey: svgId,
            region: region.name, 
            weather: data
          });
          
        },

        error: (err) => {

          console.error(err);
          console.log("Erreur de recuperation API meteo.");

        }
      });
  }
}