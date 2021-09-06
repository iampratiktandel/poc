import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-multi-radio-button',
  templateUrl: './multi-radio-button.component.html',
  styleUrls: ['./multi-radio-button.component.css'],
  // providers: [
  //   { provide: MyComponentBase, useExisting: MultiRadioButtonComponent },
  // ],
})
export class MultiRadioButtonComponent implements OnInit {

  private _radioListItems!: ISelectionType[];
  private _componentOptions: any;
  private _populates: string[];

  @Input() public set radioListItems(radioListItems: ISelectionType[]) {
    if (radioListItems) {
      this._radioListItems = radioListItems;
      this.addRadios();
    }
  }

  public get radioListItems(): ISelectionType[] {
    return this._radioListItems;
  }

  @Input() public set componentOptions(componentOptions: any) {
    if (componentOptions) {
      if (componentOptions?.isRequired) {
        this.myForm.setValidators([this.minSelectedradioes(1)]);
      }

      this._componentOptions = componentOptions;
    }
    // this.myForm.setValidators([this.minSelectedradioes(1)]);
  }

  public get componentOptions(): any {
    return this._componentOptions;
  }

  @Input() public set populates(populates: string[]) {
    if (populates) {
      this._populates = populates;
    }
  }

  public get populates(): string[] {
    return this._populates;
  }

  @Output() public getRadioListSelectedData;

  form: FormGroup;

  get radioListArray() {
    return this.form.controls.radioList as FormArray;
  }
  constructor(private formBuilder: FormBuilder) {
    this.getRadioListSelectedData = new EventEmitter();
    this.form = this.formBuilder.group({
      radioList: new FormArray([], []),
    });
  }

  ngOnInit() {
    let objToSend = [
      {
        [this.populates[0]]: this.getSelected(),
      },
    ];
    this.getRadioListSelectedData.emit(objToSend);
    this.form.valueChanges.subscribe((data) => {
      let objToSend = [
        {
          [this.populates[0]]: this.getSelected(),
        },
      ];
      this.getRadioListSelectedData.emit(objToSend);
    });
  }

  public checkFormAndDisplayError() {
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  private addRadios() {
    this.radioListItems.forEach((singleradio: ISelectionType) =>
      this.radioListArray.push(
        new FormControl(singleradio.checked || false)
      )
    );
  }

  getSelected() {
    return this.form.value.radioList
      .map((checked: any, i: any) =>
        checked ? this.radioListItems[i].value : null
      )
      .filter((v: any) => v !== null);
  }

  minSelectedradioes(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      const totalSelected = formArray.value.reduce(
        (prev: any, next: any) => (next ? prev + next : prev),
        0
      );
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  get myForm() {
    return this.form.get('radioList');
  }

}

export interface ISelectionType {
  value: string;
  token: string;
  checked: boolean;
}
