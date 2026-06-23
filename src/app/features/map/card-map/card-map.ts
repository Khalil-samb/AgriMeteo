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
export class CardMap implements OnInit{
  
  // Événement envoyé au composant parent lorsqu'une région est sélectionnée
  @Output() weatherSelected = new EventEmitter<any>();

  // Région active reçue depuis le composant parent
  @Input() activeRegion: string | null = null;

  // Injection du service météo
  serviceMeteo = inject(MeteoService);

  /**
   * Cette méthode est exécutée automatiquement
   * au chargement du composant.
   */
  ngOnInit(): void {

    this.detecterPositionUtilisateur();

  }

  /**
   * Demande la position GPS de l'utilisateur.
   *
   * Cas possibles :
   * 1. L'utilisateur accepte → recherche de sa région.
   * 2. L'utilisateur refuse → chargement de Dakar.
   * 3. Le navigateur ne supporte pas la géolocalisation → Dakar.
   */
  private detecterPositionUtilisateur(): void {

    // Vérifie si le navigateur supporte la géolocalisation
    if (!navigator.geolocation) {

      console.log('La géolocalisation n’est pas supportée.');

      this.chargerRegionParDefaut();

      return;
    }

    // Demande l'autorisation à l'utilisateur
    navigator.geolocation.getCurrentPosition(

      // Succès
      (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Latitude :', latitude);
        console.log('Longitude :', longitude);

        this.traiterPositionUtilisateur(latitude,longitude);

      },

      // Erreur ou refus
      (erreur) => {

        console.error('Permission refusée', erreur);

        this.chargerRegionParDefaut();

      }

    );
  }

  /**
   * Vérifie si l'utilisateur se trouve au Sénégal.
   *
   * On utilise un rectangle géographique simplifié.
   */
  private estAuSenegal(latitude: number, longitude: number): boolean {

    return (

      latitude >= 12 &&
      latitude <= 17 &&

      longitude >= -18 &&
      longitude <= -11

    );

  }

  /**
   * Traite la position récupérée.
   *
   * Si l'utilisateur est hors du Sénégal,
   * on charge Dakar.
   *
   * Sinon on cherche la région la plus proche.
   */
  private traiterPositionUtilisateur(latitude: number, longitude: number): void {

    if (!this.estAuSenegal(latitude, longitude)) {

      console.log('Utilisateur hors du Sénégal');

      this.chargerRegionParDefaut();

      return;

    }

    const regionLaPlusProche = this.trouverRegionLaPlusProche(latitude, longitude);

    console.log('Région détectée :', regionLaPlusProche);

    // Charge automatiquement la météo
    this.onRegionClick(regionLaPlusProche);

  }

  /**
   * Recherche la région sénégalaise
   * la plus proche des coordonnées GPS.
   */
  private trouverRegionLaPlusProche(latitude: number, longitude: number): string {

    let regionLaPlusProche = 'dakar';

    let distanceMinimum = Infinity;

    REGIONS.forEach((region) => {

      // Calcul simple de distance
      const distance = Math.sqrt(

        Math.pow(latitude - region.lat, 2) +
        Math.pow(longitude - region.lon, 2)

      );

      // Si la distance trouvée est plus petite,
      // on mémorise cette région
      if (distance < distanceMinimum) {

        distanceMinimum = distance;

        regionLaPlusProche = region.id;

      }

    });

    return regionLaPlusProche;

  }

  /**
   * Charge la région Dakar.
   *
   * Utilisée lorsque :
   * - l'utilisateur refuse la permission
   * - l'utilisateur est hors Sénégal
   * - la géolocalisation n'est pas disponible
   */
  private chargerRegionParDefaut(): void {

    console.log('Chargement de Dakar par défaut');

    this.onRegionClick('dakar');

  }

  /**
   * Exécutée lorsqu'une région est cliquée
   * sur la carte SVG.
   */
  onRegionClick(svgId: string): void {

    const region = REGIONS.find(r => r.id === svgId);

    if (!region) {

      console.log('Région introuvable');

      return;

    }

    // Appel de l'API OpenWeather
    this.serviceMeteo.getMeteo(region.lat, region.lon).subscribe({

        next: (data) => {

          // Envoi des données météo
          // vers le composant parent
          this.weatherSelected.emit({

            regionKey: svgId,

            region: region.name,

            weather: data

          });

        },

        error: (err) => {

          console.error(err);

          console.log(
            'Erreur de récupération météo'
          );

        }

      });

  }

}