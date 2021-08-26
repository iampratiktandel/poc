import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 10,
    showSelectionBar: true,
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
