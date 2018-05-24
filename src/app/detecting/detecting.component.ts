import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {  AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { Casedetail } from './../case-detail';
import { Team } from '../team';

declare var google: any;


@Component({
  selector: 'app-detecting',
  templateUrl: './detecting.component.html',
  styleUrls: ['./detecting.component.scss']
})
export class DetectingComponent implements OnInit {

  itemRef: AngularFireObject<any>;

  itemRefTeam: AngularFireList<any>;
  teams: Observable<Team[]>;

  item:Item;
  id;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  casedetail: Casedetail[];
  selectCase;

  selectTeam: Team;

  path1: any;
  path2: any;
  public distance: any;
  public duration: string;
  public start_address: string;
  public end_address: string;
 
  

  constructor(private route: ActivatedRoute ,private afDB: AngularFireDatabase) {
   
    
    this.id = this.route.snapshot.params['id'];
    this.itemRef = afDB.object(`test/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {
    
      this.item = action.payload.val();
      console.log(this.item)

    });

    this.itemRefTeam = this.afDB.list('/teams');
    this.teams = this.itemRefTeam.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) ;
    });

  }
 


  ngOnInit() {

    // this.teams = [

    //   // new Team(1, "สว่างจิตต์ ศก.", 'Vancouver, BC'),
    //   // new Team(2, "ศก.สงเคราห์", 'Seattle, WA'),
    //   // new Team(3, "อบต.โพนค้อ", 'San Francisco, CA'),

    // ]

    this.MapStart();
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

  routePath() {
    // this.path1 = this.selectCase.name
    // this.path2 = this.selectTeam.location 
    this.path1 = this.selectTeam.location //ทีมช่วยเหลือ
    console.log(this.path1)
    this.path2 = { lat: this.item.latitude, lng: this.item.longitude } //ปลายทาง
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay)
  }
  

  calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
      origin: this.path1,
      destination: this.path2,
      travelMode: 'DRIVING'

    },  (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        
        this.distance = response.routes[0].legs[0].distance.text;
        this.duration = response.routes[0].legs[0].duration.text;
        this.start_address = response.routes[0].legs[0].start_address;
        this.end_address = response.routes[0].legs[0].end_address;

        console.log(response.routes[0].legs[0].distance.text)
        console.log(response.routes[0].legs[0].end_address)

      } else {
        window.alert('Directions request failed due to ' + status);
      }         

    }
  );

  }
  clearPath() {
    alert("clear path")
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


  showCase(scense: Casedetail) {
    this.selectCase = scense;
    console.log(scense)

  }

  onSelectTeam(team: Team) {
    console.log(team.location)
    this.selectTeam = team;
    
  }

  // createMap(location = new google.maps.LatLng(15.9842532, 101.1071849)) {
  //   let mapOptions = {
  //     center: location,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     disableDefaultUI: false
  //   }
  //   let mapEI = document.getElementById('map')
  //   let map = new google.maps.Map(mapEI, mapOptions);
  //   return map;
  // }
}

interface Item {
  telNumber?:string;
  latitude?:Number;
  longitude?:Number;
  locationDetail?:string;
  scene?:string;
  imageBase64?:string


}
