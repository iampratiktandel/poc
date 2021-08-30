import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { TemperatureSliderComponent } from './temperature-slider/temperature-slider.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AgmCoreModule } from '@agm/core';
import { LocationSaveComponent } from './location-save/location-save.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    TemperatureSliderComponent,
    ImageUploadComponent,
    LocationSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'example',
      libraries: ['places', 'drawing']
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
