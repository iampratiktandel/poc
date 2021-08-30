import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public value: number;
  public options: Options = {};

  constructor() {
    this.options = {
      floor: 1,
      ceil: 10,
      showSelectionBar: true,
      step: 1,
    };

    this.value = 1;
  }

  ngOnInit(): void {
  }

  public checkIntensity() {
    if (this.value !== null) {
      if (isNaN(this.value)) {
        this.value = 5;
      } else if (this.value > 10) {
        this.value = 10;
      } else if (this.value < 1) {
        this.value = 1;
      }
    }
  }

}
