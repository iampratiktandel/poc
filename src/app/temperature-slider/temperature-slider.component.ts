import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-slider',
  templateUrl: './temperature-slider.component.html',
  styleUrls: ['./temperature-slider.component.css']
})
export class TemperatureSliderComponent implements OnInit {

  public temperature: number = 0;
  public temperatureUnits: string;
  public temperatureFloor: number;
  public temperatureCeil: number;
  public temperatureStep: number;
  public options: Options = {};
  public temperatureOptions: any = {};

  constructor() {
    this.temperatureOptions = {
      "ranges": {
        "C": {
          "min": -20,
          "max": 40,
          "step": 10
        },
        "F": {
          "min": -10,
          "max": 100,
          "step": 20
        }
      }
    }

    this.options = {
      floor: -10,
      ceil: 100,
      tickStep: 20,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      vertical: true,
      tickValueStep: 10
    }
  }

  ngOnInit(): void {
    this.initTemperature();
  }

  public setNewOption(newFloor: number, newCeil: number, newTickStep: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = newFloor;
    newOptions.ceil = newCeil;
    newOptions.tickStep = newTickStep;
    this.options = newOptions;
  }

  public initTemperature() {
    this.temperature = this.temperature || 50;
    this.temperatureUnits = this.temperatureUnits || 'F';
    // this.temperatureFloor = -10;
    // this.temperatureCeil = 100;
  }

  public isTemperatureUnit(unit: string) {
    return this.temperatureUnits === unit;
  }

  public checkTemperature() {
    if (this.temperature !== null) {
      if (isNaN(this.temperature)) {
        this.temperature = this.isTemperatureUnit('F') ? 50 : 10;
      } else if (this.temperature > this.temperatureCeil) {
        this.temperature = this.temperatureCeil;
      } else if (this.temperature < this.temperatureFloor) {
        this.temperature = this.temperatureFloor;
      }
    }
  }

  public setTemperatureUnit(unit: string) {
    // const tempRanges = $scope.currentQuestion.options.ranges;
    const tempRanges = this.temperatureOptions.ranges;
    //Set only if not already set
    if (this.temperatureUnits !== unit) {
      this.temperatureUnits = unit;
      this.temperatureFloor = tempRanges[unit].min;
      this.temperatureCeil = tempRanges[unit].max;
      this.temperatureStep = tempRanges[unit].step;
      this.setNewOption(this.temperatureFloor, this.temperatureCeil, this.temperatureStep);
      this.temperature = Math.round(unit === 'F' ? this.temperature * 9 / 5 + 32 : (this.temperature - 32) * 5 / 9);
      if (this.temperature > this.temperatureCeil) {
        this.temperature = this.temperatureCeil;
      } else if (this.temperature < this.temperatureFloor) {
        this.temperature = this.temperatureFloor;
      }
    }
  }
}