import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MeteoService } from '../../../services/weather.service';
import { REGIONS } from '../../../data/regions';

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

  selectedRegion: string | null = null;

  serviceMeteo = inject(MeteoService)

  donneesMeteo! : any
  
  onRegionClick(regionkey: string) {
    this.selectedRegion = regionkey;

    const region = REGIONS[regionkey]

    if (!region) {
      console.log("region n'existe pas");
      return
      
    }

    this.serviceMeteo.getMeteo(region.lat, region.lon).subscribe({
        next: (data) => {
          this.donneesMeteo = data
          console.log(this.donneesMeteo);

          this.weatherSelected.emit({
            region: region.name,
            weather: data
          });
          
        },

        error: (err) => {

          console.error(err);

        }
      });

    console.log('Région sélectionnée:', region);
  }
}