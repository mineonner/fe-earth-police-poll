import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'm-google-map',
    templateUrl: './m-google-map.component.html',
    styleUrl: './m-google-map.component.scss',
    standalone: false
})
export class MGoogleMapComponent {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  markerPosition:google.maps.LatLngLiteral;
  center = {
    lat: 13.7248785,
    lng: 100.4683014
  }
  options: google.maps.MapOptions = {
    // center: {
    //   lat: 13.730608,
    //   lng: 100.2181228
    // },
    zoom: 15,

    streetViewControl: false,
    mapTypeControl: false,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  @Input() location:string;
  @Input() mode:string;
  @Input() title:string;
  @Input() isRequired:boolean = false;
  @Output() locationChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('location' in changes) {
      if(this.location){
        let latlng = this.location.split(',')
        this.markerPosition = {
          lat: Number(latlng[0]),
          lng: Number(latlng[1])
        }
        this.center = this.markerPosition;
      }
    }
  }


  ngAfterViewInit(): void {
    if(this.mode != 'mode'){
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if(places?.length == 0) {
          return;
        }else{
          const bounds = new google.maps.LatLngBounds();
          places?.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
              console.log("Returned place contains no geometry");
              return;
            }

            this.markerPosition = place.geometry.location.toJSON();
            this.center = this.markerPosition
            if(this.markerPosition) {
              this.location = `${this.markerPosition.lat},${this.markerPosition.lng}`
              this.locationChange.emit(this.location);
            };

            // if (place.geometry.viewport) {
            //   bounds.union(place.geometry.viewport);
            // } else {
            //   bounds.extend(place.geometry.location);
            // }
            return;
          });

          // this.map.fitBounds(bounds);
        }

      })
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(this.mode != 'view'){
      if(event.latLng?.toJSON()) this.markerPosition = event.latLng.toJSON();
      if(this.markerPosition) this.location = `${this.markerPosition.lat},${this.markerPosition.lng}`;
      this.locationChange.emit(this.location);
    }
  }

  setCurrentPosition(ele:HTMLElement){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPosition = pos;
          if(this.markerPosition) {
            this.location = `${this.markerPosition.lat},${this.markerPosition.lng}`
            this.locationChange.emit(this.location);
            this.center = pos;
          };
        }
      );
    }
  }
}
