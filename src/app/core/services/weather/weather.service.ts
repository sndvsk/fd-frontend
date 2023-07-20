import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather/weather-data';
import { WeatherDataClient } from '../../clients/weather.clients';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor(private client: WeatherDataClient) {}

  getWeatherDataForAllSupportedCities(): Observable<WeatherData[]> {
    return this.client.getWeatherData();
  }

  getWeatherDataForSelectedCities(cities: string): Observable<WeatherData[]> {
    return this.client.getWeatherData(cities);
  }

  getAllWeatherData(): Observable<WeatherData[]> {
    return this.client.getAllWeatherData();
  }

  addWeatherData(data: {stationName: string; wmoCode?: number; airTemperature: number; windSpeed: number; weatherPhenomenon: string; time?: Date}): Observable<WeatherData> {
    return this.client.addWeatherData(data);
  }

  getWeatherDataById(id: number): Observable<WeatherData> {
    return this.client.getWeatherDataById(id);
  }

  patchWeatherDataById(id: number, data: {airTemperature?: number; windSpeed?: number; weatherPhenomenon?: string}): Observable<WeatherData> {
    return this.client.patchWeatherDataById(id, data);
  }

  deleteWeatherDataById(id: number): Observable<string> {
    return this.client.deleteWeatherDataById(id);
  }
}
