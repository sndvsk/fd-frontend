import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather/weather-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataClient {
  private baseUrl = environment.apiUrl + '/api/v1/weather';

  constructor(private http: HttpClient) {}

  getWeatherData(cities?: string): Observable<WeatherData[]> {
    if (cities) {
      return this.http.get<WeatherData[]>(`${this.baseUrl}/cities/${cities}`);
    }
    return this.http.get<WeatherData[]>(`${this.baseUrl}/cities`);
  }

  getAllWeatherData(): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(this.baseUrl);
  }

  addWeatherData(data: {stationName: string; wmoCode?: number; airTemperature: number; windSpeed: number; weatherPhenomenon: string; time?: Date}): Observable<WeatherData> {
    return this.http.post<WeatherData>(this.baseUrl, data);
  }

  getWeatherDataById(id: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.baseUrl}/${id}`);
  }

  patchWeatherDataById(id: number, data: {airTemperature?: number; windSpeed?: number; weatherPhenomenon?: string}): Observable<WeatherData> {
    return this.http.patch<WeatherData>(`${this.baseUrl}/${id}`, data);
  }

  deleteWeatherDataById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
