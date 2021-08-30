import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-save',
  templateUrl: './location-save.component.html',
  styleUrls: ['./location-save.component.css']
})
export class LocationSaveComponent implements OnInit {

  public address: string;
  public currentLocation: string;
  public location: Location; 
  public latitude: number;
  public longitude: number;
  private geoCoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
      this.location = new Location();
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



  // private setCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: any) => {
  //       if (position) {
  //         this.lat = position.coords.latitude;
  //         this.lang = position.coords.longitude;
  //         this.getAddress = (this.lat, this.lang)
  //         console.log(position)
  //         this.mapsAPILoader.load().then(() => {
  //           let geocoder = new google.maps.Geocoder;
  //           let latlng = { lat: this.lat, lng: this.lang };
  //           geocoder.geocode({ 'location': latlng }, (results) => {
  //             if (results[1]) {
  //               console.log(results)
  //               this.currentLocation = results[0].formatted_address;
  //               let value = this.currentLocation.split(",");
  //               console.log(value)
  //               let count = value.length;
  //               let country = value[count - 1];
  //               let state = value[count - 2];
  //               this.city = value[count - 3];
  //               console.log(`Country: ${country}, State: ${state}, City: ${this.city} `)
  //               // this.getDriverLocation();
  //             } else {
  //               console.log('Not found');
  //             }
  //           });
  //         });
  //       }
  //     })
  //   }
  // }