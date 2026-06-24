import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MeteoService } from '../../services/weather.service';
import { REGIONS } from '../../data/regions.data';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-list-regions',
  imports: [DecimalPipe, NgClass],
  templateUrl: './list-regions.html',
  styleUrl: './list-regions.css',
})
export class ListRegions implements OnInit{
  // Événement émis lorsqu'une région est sélectionnée
  @Output() weatherSelected = new EventEmitter<any>();

  @Input() activeRegion: string | null = null; // ← reçoit la synchro du parent

  // selectedRegion!: string;

  serviceMeteo = inject(MeteoService)

  regions  = REGIONS

  // Stocke la météo de chaque région : { 'dakar': {...}, 'thies': {...} }
  meteoParRegion: Record<string, any> = {};

  ngOnInit() {
    // Au démarrage, on charge la météo de toutes les régions
    for (const region of this.regions) {
      this.serviceMeteo.getMeteo(region.lat, region.lon).subscribe({
        next: (data) => {
          this.meteoParRegion[region.id] = data;
        },
        error: () => {
          this.meteoParRegion[region.id] = null; // c'est pour eviter  que l'application de crashe
          console.log("Erreur de recuperation de la liste des regions");
          
        }
      });
    }
  }
  
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

  getTempColor(temp: number | null | undefined): string {
    if (temp == null) return 'bg-gray-400';     // pas de données
    if (temp < 30) return 'bg-green-600';       // faible
    if (temp < 35) return 'bg-yellow-400';      // modérée
    return 'bg-red-600';                        // élevée
  }
}
