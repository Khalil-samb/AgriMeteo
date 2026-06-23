import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

    private http = inject(HttpClient);

    private apiKey = environment.openWeatherApiKey;

    getMeteo(lat: number, lon: number){
        return this.http.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=fr`
        )
    }

}