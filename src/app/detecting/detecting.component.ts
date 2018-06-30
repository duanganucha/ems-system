import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { DispatchClass } from '../interface';
import { Team } from '../team';
import { FormGroup } from '@angular/forms';
import { last } from 'rxjs-compat/operator/last';

declare var google: any;


@Component({
  selector: 'app-detecting',
  templateUrl: './detecting.component.html',
  styleUrls: ['./detecting.component.scss']
})
export class DetectingComponent implements OnInit {

  @ViewChild('direction') directionModal: { show: Function, hide: Function };
  @ViewChild('panoModal') panoModal: { show: Function, hide: Function };
  @ViewChild('monitoringModal') monitoringModal: { show: Function, hide: Function };

  itemRef: AngularFireObject<any>;

  itemRefTeam: AngularFireList<any>;
  teams: Observable<Team[]>;

  item: DispatchClass;
  id;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  casedetail: DispatchClass[];
  selectCase;

  selectTeam: Team;

  path1: any;
  path2: any;
  public distance: any;
  public duration: string;
  public start_address: string;
  public end_address: string;



  constructor(private activeRoute: ActivatedRoute, private router :Router, private afDB: AngularFireDatabase) {


    this.id = this.activeRoute.snapshot.params['id'];
    this.itemRef = afDB.object(`requests/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {

      this.item = action.payload.val();
      console.log(this.item)

      this.StreetViewPanorama(this.item.report_location);

    });

    this.itemRefTeam = this.afDB.list('/teams');
    this.teams = this.itemRefTeam.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }


  ngOnInit() {

    this.MapStart();

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
    this.path1 = this.selectTeam.location  //ทีมช่วยเหลือ
    this.path2 = this.item.report_location //ปลายทาง

    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay)
  }


  calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
      origin: this.path1,
      destination: this.path2,
      travelMode: 'DRIVING'

    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);

        this.distance = response.routes[0].legs[0].distance.text;
        this.duration = response.routes[0].legs[0].duration.text;
        this.start_address = response.routes[0].legs[0].start_address;
        this.end_address = response.routes[0].legs[0].end_address;

        console.log(response.routes[0].legs[0].distance.text)
        console.log(response.routes[0].legs[0].duration.text)
        console.log(response.routes[0].legs[0].end_address)

      } else {
        window.alert('Directions request failed due to ' + status);
      }

    }
    );

  }

   
  autoSearchPath() {

    this.itemRefTeam = this.afDB.list('/teams');
    this.itemRefTeam.snapshotChanges().subscribe(snapshot => {
      snapshot.forEach(snapshot => {

        this.routePath2( snapshot.key, snapshot.payload.val() )
        
      })
    });

  }
 
  myArray = [];
  

  routePath2(key,value) {

    // console.log(this.teamRoute_val.location)
    this.path1 = value.location  //ทีมช่วยเหลือ
    this.path2 = this.item.report_location //ปลายทาง

    this.directionsService.route({
      origin: this.path1,
      destination: this.path2,
      travelMode: 'DRIVING'

    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);

        this.distance = response.routes[0].legs[0].distance.text;
        this.duration = response.routes[0].legs[0].duration.text;
        this.start_address = response.routes[0].legs[0].start_address;
        this.end_address = response.routes[0].legs[0].end_address;

        // console.log(response.routes[0].legs[0].duration.text)
        // console.log(response.routes[0].legs[0].end_address)
       
       
        var distance = 
          { key : key ,
           distance :response.routes[0].legs[0].distance.value ,
           time :  response.routes[0].legs[0].duration.text 
          }
        
        this.myArray.push(distance)

        console.log('distance = ' + JSON.stringify(this.myArray))

      } else {
        window.alert('Directions request failed due to ' + status);
      }

    }
    );

  }

  panoModalShow(){
    this.panoModal.show();

    this.StreetViewPanorama(this.item.report_location);


    // var report_location : {
    //   lat : 1,
    //   lng : 2
    // }
    // const itemsRef = this.afDB.list('positions');
    // itemsRef.update(this.id,report_location);

  }


  StreetViewPanorama(report_location) {
    // var fenway = { lat: 42.345573, lng: -71.098326 };
    var fenway = report_location ;
    console.log(report_location)

    var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: fenway,
      zoom: 16
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


  showCase(scense: DispatchClass) {
    this.selectCase = scense;
    console.log(scense)

  }

  onSelectTeam(team: Team) {
    this.selectTeam = team;
    console.log(this.selectTeam.name)
  }

  directionForm(form){
    form.show();
  }

  onMonitoring(){
    this.monitoringModal.show();
  }
}


interface Item {
  telNumber?: string;
  location: {
    lat:string;
    lng:string;
  }
  locationDetail?: string;
  scene?: string;
  image?: string
}



