/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegionalBaseFeeRule } from 'src/app/models/fee-rule/base';
import { ExtraFeeAirTemperatureRule } from 'src/app/models/fee-rule/temperature';
import { ExtraFeeWindSpeedRule } from 'src/app/models/fee-rule/wind';
import { ExtraFeeWeatherPhenomenonRule } from 'src/app/models/fee-rule/phenomenon';

@Injectable({
  providedIn: 'root',
})
export class FeeRuleClient {
  private baseURL = environment.apiUrl + '/api/v1/rules';

  constructor(private http: HttpClient) {}

  getAllRegionalBaseFeeRules(): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/base`);
  }

  createRegionalBaseFeeRule(feeRule: RegionalBaseFeeRule): Observable<any> {
    return this.http.post(`${this.baseURL}/fee/base`, feeRule);
  }

  getRegionalBaseFeeRuleById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/base/${id}`);
  }

  updateRegionalBaseFeeRule(id: string, feeRule: RegionalBaseFeeRule): Observable<any> {
    return this.http.patch(`${this.baseURL}/fee/base/${id}`, feeRule);
  }

  deleteRegionalBaseFeeRule(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/fee/base/${id}`);
  }

  // Air Temperature Extra Fee Rules

  getAllExtraFeeAirTemperatureRules(): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/temperature`);
  }

  createExtraFeeAirTemperatureRule(rule: ExtraFeeAirTemperatureRule): Observable<any> {
    return this.http.post(`${this.baseURL}/fee/extra/temperature`, rule);
  }

  getExtraFeeAirTemperatureRuleById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/temperature/${id}`);
  }

  updateExtraFeeAirTemperatureRule(id: string, rule: ExtraFeeAirTemperatureRule): Observable<any> {
    return this.http.patch(`${this.baseURL}/fee/extra/temperature/${id}`, rule);
  }

  deleteExtraFeeAirTemperatureRule(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/fee/extra/temperature/${id}`);
  }

  // Wind Speed Extra Fee Rules

  getAllExtraFeeWindSpeedRules(): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/windspeed`);
  }

  createExtraFeeWindSpeedRule(rule: ExtraFeeWindSpeedRule): Observable<any> {
    return this.http.post(`${this.baseURL}/fee/extra/windspeed`, rule);
  }

  getExtraFeeWindSpeedRuleById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/windspeed/${id}`);
  }

  updateExtraFeeWindSpeedRule(id: string, rule: ExtraFeeWindSpeedRule): Observable<any> {
    return this.http.patch(`${this.baseURL}/fee/extra/windspeed/${id}`, rule);
  }

  deleteExtraFeeWindSpeedRule(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/fee/extra/windspeed/${id}`);
  }

  // Weather Phenomenon Extra Fee Rules

  getAllExtraFeeWeatherPhenomenonRules(): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/phenomenon`);
  }

  createExtraFeeWeatherPhenomenonRule(rule: ExtraFeeWeatherPhenomenonRule): Observable<any> {
    return this.http.post(`${this.baseURL}/fee/extra/phenomenon`, rule);
  }

  getExtraFeeWeatherPhenomenonRuleById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/fee/extra/phenomenon/${id}`);
  }

  updateExtraFeeWeatherPhenomenonRule(id: string, rule: ExtraFeeWeatherPhenomenonRule): Observable<any> {
    return this.http.patch(`${this.baseURL}/fee/extra/phenomenon/${id}`, rule);
  }

  deleteExtraFeeWeatherPhenomenonRule(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/fee/extra/phenomenon/${id}`);
  }
}
 */
