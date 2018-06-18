import { Component, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss']
})
export class Map2Component implements OnInit {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;



  constructor() { }

  ngOnInit() {
    // this.MapStart();
    this.StreetViewPanorama();
  }

  MapStart() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 15.0210006, lng: 104.3137318 }
    });
    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(document.getElementById('right-panel'));
  }

  StreetViewPanorama() {
    // var fenway = { lat: 42.345573, lng: -71.098326 };
    var fenway = { lat: 15.1158148, lng: 104.3205983 };

    var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: fenway,
      zoom: 10
    });
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    map2.setStreetView(panorama);

  }

}
