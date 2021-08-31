import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-mvp',
  templateUrl: './location-mvp.component.html',
  styleUrls: ['./location-mvp.component.css']
})
export class LocationMvpComponent implements OnInit {

  public address: string;
  public currentLocation: string;
  public location: Location; 
  public latitude: number;
  public longitude: number;
  public capturingLocation: boolean;
  private geoCoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
      this.location = new Location();
      this.capturingLocation = false;
  }

  // getDriverLocation() {
  //   throw new Error('Method not implemented.');
  // }
  
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
    //   // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }
  
  public setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(position)
        this.capturingLocation = true;
        if (position) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          // this.location.pinLocations[0].latitude = this.latitude;
          // this.location.pinLocations[0].longitude = this.longitude;
          // this.location.pinLocations[0].latitude = position.coords.latitude;
          // this.location.pinLocations[0].longitude = position.coords.longitude;
          this.getAddress(this.latitude, this.longitude)
        }
      })
    }
  }
  
  private getAddress(latitude: number, longitude: number) {
    let latlng = { lat: latitude, lng: longitude };
    this.geoCoder.geocode({ 'location': latlng }, (results: any) => {
      console.log(results)
      if (results[0]) {
        this.currentLocation = results[0].formatted_address;
        let value = this.currentLocation.split(",");
        let count = value.length;

        let country = value[count - 1];
        let stateValue = value[count - 2];
        let stateArray = stateValue.split(" ");
        let state = stateArray[1];
        let zipCode = stateArray[2];
        let city = value[count - 3];

        this.location.country = country;
        this.location.state = state;
        this.location.zipCode = zipCode;
        this.location.city = city;
        this.location.googlePlacesId = results[0].place_id
        // this.getDriverLocation();
        console.log(country)
        // this.capturingLocation = false;
      } else {
        console.log('Not found');
      }
    });
  }

}


export class Location {
  "name": string;
  "streetNumber": string;
  "streetName": string;
  "city": string;
  "state": string;
  "country": string;
  "zipCode": string;
  "googlePlacesId": string;
  "locationNotes": string;
  "pinLocations": [
    {
      "latitude": number;
      "longitude": number;
      "config": {
        "label": string;
        "title": string;
        "pinType": string;
      }
    }
  ]
}