/* import { Injectable } from '@angular/core';
import { FeeRuleClient } from '../../clients/fee-rule.client';
import { RegionalBaseFeeRule } from 'src/app/models/fee-rule/base';
import { ExtraFeeWeatherPhenomenonRule } from 'src/app/models/fee-rule/phenomenon';
import { ExtraFeeAirTemperatureRule } from 'src/app/models/fee-rule/temperature';
import { ExtraFeeWindSpeedRule } from 'src/app/models/fee-rule/wind';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class FeeRuleService {
  feeRules!: RegionalBaseFeeRule;
  airTemperatureRules!: ExtraFeeAirTemperatureRule;
  windSpeedRules!: ExtraFeeWindSpeedRule;
  weatherPhenomenonRules!: ExtraFeeWeatherPhenomenonRule;

  constructor(private errorHandler: ErrorHandlerService, private feeRuleClient: FeeRuleClient) {}

  getFeeRules() {
    this.feeRuleClient.getAllRegionalBaseFeeRules().subscribe((data) => {
      this.feeRules = data;
    });
  }

  createFeeRule(feeRule: any) {
    this.feeRuleClient.createRegionalBaseFeeRule(feeRule).subscribe((data) => {
      console.log('Fee rule created:', data);
    });
  }

  updateFeeRule(id: string, feeRule: any) {
    this.feeRuleClient.updateRegionalBaseFeeRule(id, feeRule).subscribe((data) => {
      console.log('Fee rule updated:', data);
    });
  }

  getFeeRuleById(id: string) {
    this.feeRuleClient.getRegionalBaseFeeRuleById(id).subscribe((data) => {
      console.log('Fee rule fetched:', data);
    });
  }

  deleteFeeRule(id: string) {
    this.feeRuleClient.deleteRegionalBaseFeeRule(id).subscribe((data) => {
      console.log('Fee rule deleted:', data);
    });
  }

  getAirTemperatureRules() {
    this.feeRuleClient.getAllExtraFeeAirTemperatureRules().subscribe((data) => {
      this.airTemperatureRules = data;
    });
  }

  createAirTemperatureRule(rule: any) {
    this.feeRuleClient.createExtraFeeAirTemperatureRule(rule).subscribe((data) => {
      console.log('Air temperature rule created:', data);
    });
  }

  updateAirTemperatureRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeAirTemperatureRule(id, rule).subscribe((data) => {
      console.log('Air temperature rule updated:', data);
    });
  }

  getAirTemperatureRuleById(id: string) {
    this.feeRuleClient.getExtraFeeAirTemperatureRuleById(id).subscribe((data) => {
      console.log('Air temperature rule fetched:', data);
    });
  }

  deleteAirTemperatureRule(id: string) {
    this.feeRuleClient.deleteExtraFeeAirTemperatureRule(id).subscribe((data) => {
      console.log('Air temperature rule deleted:', data);
    });
  }

  getWindSpeedRules() {
    this.feeRuleClient.getAllExtraFeeWindSpeedRules().subscribe((data) => {
      this.windSpeedRules = data;
    });
  }

  createWindSpeedRule(rule: any) {
    this.feeRuleClient.createExtraFeeWindSpeedRule(rule).subscribe((data) => {
      console.log('Wind speed rule created:', data);
    });
  }

  updateWindSpeedRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeWindSpeedRule(id, rule).subscribe((data) => {
      console.log('Wind speed rule updated:', data);
    });
  }

  getWindSpeedRuleById(id: string) {
    this.feeRuleClient.getExtraFeeWindSpeedRuleById(id).subscribe((data) => {
      console.log('Wind speed rule fetched:', data);
    });
  }

  deleteWindSpeedRule(id: string) {
    this.feeRuleClient.deleteExtraFeeWindSpeedRule(id).subscribe((data) => {
      console.log('Wind speed rule deleted:', data);
    });
  }

  getWeatherPhenomenonRules() {
    this.feeRuleClient.getAllExtraFeeWeatherPhenomenonRules().subscribe((data) => {
      this.weatherPhenomenonRules = data;
    });
  }

  createWeatherPhenomenonRule(rule: any) {
    this.feeRuleClient.createExtraFeeWeatherPhenomenonRule(rule).subscribe((data) => {
      console.log('Weather phenomenon rule created:', data);
    });
  }

  updateWeatherPhenomenonRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeWeatherPhenomenonRule(id, rule).subscribe((data) => {
      console.log('Weather phenomenon rule updated:', data);
    });
  }

  getWeatherPhenomenonRuleById(id: string) {
    this.feeRuleClient.getExtraFeeWeatherPhenomenonRuleById(id).subscribe((data) => {
      console.log('Weather phenomenon rule fetched:', data);
    });
  }

  deleteWeatherPhenomenonRule(id: string) {
    this.feeRuleClient.deleteExtraFeeWeatherPhenomenonRule(id).subscribe((data) => {
      console.log('Weather phenomenon rule deleted:', data);
    });
  }
}
 */
