import { Injectable } from '@angular/core';
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
      // Add your logic for after the fee rule is created
      console.log('Fee rule created:', data);
      // Perform any additional operations or update UI
    });
  }

  updateFeeRule(id: string, feeRule: any) {
    this.feeRuleClient.updateRegionalBaseFeeRule(id, feeRule).subscribe((data) => {
      // Add your logic for after the fee rule is updated
      console.log('Fee rule updated:', data);
      // Perform any additional operations or update UI
    });
  }

  getFeeRuleById(id: string) {
    this.feeRuleClient.getRegionalBaseFeeRuleById(id).subscribe((data) => {
      // Add your logic for after the fee rule is fetched
      console.log('Fee rule fetched:', data);
      // Perform any additional operations or update UI
    });
  }

  deleteFeeRule(id: string) {
    this.feeRuleClient.deleteRegionalBaseFeeRule(id).subscribe((data) => {
      // Add your logic for after the fee rule is deleted
      console.log('Fee rule deleted:', data);
      // Perform any additional operations or update UI
    });
  }

  getAirTemperatureRules() {
    this.feeRuleClient.getAllExtraFeeAirTemperatureRules().subscribe((data) => {
      this.airTemperatureRules = data;
    });
  }

  createAirTemperatureRule(rule: any) {
    this.feeRuleClient.createExtraFeeAirTemperatureRule(rule).subscribe((data) => {
      // Add your logic for after the air temperature rule is created
      console.log('Air temperature rule created:', data);
      // Perform any additional operations or update UI
    });
  }

  updateAirTemperatureRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeAirTemperatureRule(id, rule).subscribe((data) => {
      // Add your logic for after the air temperature rule is updated
      console.log('Air temperature rule updated:', data);
      // Perform any additional operations or update UI
    });
  }

  getAirTemperatureRuleById(id: string) {
    this.feeRuleClient.getExtraFeeAirTemperatureRuleById(id).subscribe((data) => {
      // Add your logic for after the air temperature rule is fetched
      console.log('Air temperature rule fetched:', data);
      // Perform any additional operations or update UI
    });
  }

  deleteAirTemperatureRule(id: string) {
    this.feeRuleClient.deleteExtraFeeAirTemperatureRule(id).subscribe((data) => {
      // Add your logic for after the air temperature rule is deleted
      console.log('Air temperature rule deleted:', data);
      // Perform any additional operations or update UI
    });
  }

  getWindSpeedRules() {
    this.feeRuleClient.getAllExtraFeeWindSpeedRules().subscribe((data) => {
      this.windSpeedRules = data;
    });
  }

  createWindSpeedRule(rule: any) {
    this.feeRuleClient.createExtraFeeWindSpeedRule(rule).subscribe((data) => {
      // Add your logic for after the wind speed rule is created
      console.log('Wind speed rule created:', data);
      // Perform any additional operations or update UI
    });
  }

  updateWindSpeedRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeWindSpeedRule(id, rule).subscribe((data) => {
      // Add your logic for after the wind speed rule is updated
      console.log('Wind speed rule updated:', data);
      // Perform any additional operations or update UI
    });
  }

  getWindSpeedRuleById(id: string) {
    this.feeRuleClient.getExtraFeeWindSpeedRuleById(id).subscribe((data) => {
      // Add your logic for after the wind speed rule is fetched
      console.log('Wind speed rule fetched:', data);
      // Perform any additional operations or update UI
    });
  }

  deleteWindSpeedRule(id: string) {
    this.feeRuleClient.deleteExtraFeeWindSpeedRule(id).subscribe((data) => {
      // Add your logic for after the wind speed rule is deleted
      console.log('Wind speed rule deleted:', data);
      // Perform any additional operations or update UI
    });
  }

  getWeatherPhenomenonRules() {
    this.feeRuleClient.getAllExtraFeeWeatherPhenomenonRules().subscribe((data) => {
      this.weatherPhenomenonRules = data;
    });
  }

  createWeatherPhenomenonRule(rule: any) {
    this.feeRuleClient.createExtraFeeWeatherPhenomenonRule(rule).subscribe((data) => {
      // Add your logic for after the weather phenomenon rule is created
      console.log('Weather phenomenon rule created:', data);
      // Perform any additional operations or update UI
    });
  }

  updateWeatherPhenomenonRule(id: string, rule: any) {
    this.feeRuleClient.updateExtraFeeWeatherPhenomenonRule(id, rule).subscribe((data) => {
      // Add your logic for after the weather phenomenon rule is updated
      console.log('Weather phenomenon rule updated:', data);
      // Perform any additional operations or update UI
    });
  }

  getWeatherPhenomenonRuleById(id: string) {
    this.feeRuleClient.getExtraFeeWeatherPhenomenonRuleById(id).subscribe((data) => {
      // Add your logic for after the weather phenomenon rule is fetched
      console.log('Weather phenomenon rule fetched:', data);
      // Perform any additional operations or update UI
    });
  }

  deleteWeatherPhenomenonRule(id: string) {
    this.feeRuleClient.deleteExtraFeeWeatherPhenomenonRule(id).subscribe((data) => {
      // Add your logic for after the weather phenomenon rule is deleted
      console.log('Weather phenomenon rule deleted:', data);
      // Perform any additional operations or update UI
    });
  }
}
