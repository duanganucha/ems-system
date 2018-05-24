import { Component, OnInit, ViewChild } from '@angular/core';

declare const google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: 15.1155519, lng: 104.3203252 } , // Australia.
      
    });


    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map,
      panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function () {
      this.computeTotalDistance(directionsDisplay.getDirections());
    });

    this.displayRoute({ lat: 15.134931, lng: 104.269180 }, { lat: 15.1051566, lng: 104.3771085 }, directionsService,
      directionsDisplay);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      // waypoints: [{location: 'Perth, WA'}, {location: 'Sydney, NSW'}],
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

}
