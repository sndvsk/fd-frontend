export interface WeatherData {
    id?: number;
    stationName: string;
    wmoCode: number;
    airTemperature: number;
    windSpeed: number;
    weatherPhenomenon: string;
    time: Date;
  }