import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { TemperatureSliderComponent } from './temperature-slider/temperature-slider.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AgmCoreModule } from '@agm/core';
import { LocationSaveComponent } from './location-save/location-save.component';
import { TempMvpComponent } from './temp-mvp/temp-mvp.component';
import { LocationMvpComponent } from './location-mvp/location-mvp.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    TemperatureSliderComponent,
    ImageUploadComponent,
    LocationSaveComponent,
    TempMvpComponent,
    LocationMvpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1LO57a_lvNYcpgFynSG08Vt4d9fNBVy0',
      libraries: ['places', 'drawing']
  }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
