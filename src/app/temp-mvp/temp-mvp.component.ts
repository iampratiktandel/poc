import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-temp-mvp',
  templateUrl: './temp-mvp.component.html',
  styleUrls: ['./temp-mvp.component.css']
})
export class TempMvpComponent implements OnInit {

  public temperature: number = 0;
  public temperatureUnits: string;
  public temperatureFloor: number;
  public temperatureCeil: number;
  public temperatureStep: number;
  public options: Options = {};
  public temperatureOptions: any = {};

  public temperatureForm: FormGroup;
  private _temperatureData: any[];
  private _componentOptions: any;

  @Input() public set temperatureData(temperatureData: any) {
    if (temperatureData) {
      this._temperatureData = temperatureData;

      if (temperatureData.temperatureUnit) {
        this.temperatureUnitControl?.setValue(temperatureData.temperatureUnit);
      }
      if (temperatureData.temperature != 0) {
        this.temperatureControl?.setValue(temperatureData.temperature);
      }
    }
  }

  public get temperatureData(): any {
    return this._temperatureData;
  }

  @Input() public set componentOptions(componentOptions: any) {
    if (componentOptions) {
      if (componentOptions?.isRequired) {
        this.temperatureControl.setValidators([Validators.required]);
        this.temperatureUnitControl.setValidators([Validators.required]);
      }

      this._componentOptions = componentOptions;
    }
  }

  public get componentOptions(): any {
    return this._componentOptions;
  }

  @Output() public getTemperatureData: EventEmitter<any>;

  constructor(
    private fb: FormBuilder
  ) {
      this.temperatureForm = this.fb.group({
        temperatureValue: [null, []],
        temperatureUnit: [null, []],
      });
      this.getTemperatureData = new EventEmitter();

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
        // showTicks: true, 
        showTicksValues: true,
        showSelectionBar: true,
        vertical: true,
        tickValueStep: 10
      }
  }

  ngOnInit(): void {
    this.initTemperature();
    this.getTemperatureData.emit(this.temperatureForm.value);
    this.temperatureForm.valueChanges.subscribe((data) => {
      console.log('data', data);
      this.getTemperatureData.emit(this.temperatureForm.value);
    });
  }

  public checkFormAndDisplayError() {
    this.temperatureForm.markAllAsTouched();
    return this.temperatureForm.valid;
  }

  get temperatureControl() {
    return this.temperatureForm.get('temperatureValue');
  }
  get temperatureUnitControl() {
    return this.temperatureForm.get('temperatureUnit');
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
    const tempRanges = this.componentOptions.ranges;
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
