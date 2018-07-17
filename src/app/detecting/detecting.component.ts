import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { DispatchClass } from '../interface';
import { Team } from '../team';
import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';

declare var google: any;



@Component({
  selector: 'app-detecting',
  templateUrl: './detecting.component.html',
  styleUrls: ['./detecting.component.scss']
})
export class DetectingComponent implements OnInit {

  @ViewChild('directionTeamModal') directionTeamModal: { show: Function, hide: Function };
  @ViewChild('streetviewModal') streetviewModal: { show: Function, hide: Function };
  @ViewChild('monitoringModal') monitoringModal: { show: Function, hide: Function };

  itemRef: AngularFireObject<any>;
  itemRefTeam: AngularFireList<any>;
  teams: Observable<Team[]>;
  item: DispatchClass;
  team: any;
  
  id ;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  path1: any;
  path2: any;
  public distance: any;
  public duration: string;
  public start_address: string;
  public end_address: string;
  missionStatus;

  constructor(private activeRoute: ActivatedRoute, 
              private router: Router, 
              private afDB: AngularFireDatabase,
              private builder: FormBuilder) {


    this.id = this.activeRoute.snapshot.params['id'];
    this.itemRef = afDB.object(`requests/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {

      this.item = action.payload.val();
      console.log(this.item)
      this.StreetViewPanorama(this.item.report_location)
      this.missionStatus = this.item.missionStatus


    });

    this.itemRefTeam = this.afDB.list('/teams');
    this.teams = this.itemRefTeam.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  ngOnInit() {
    this.MapStart();
  }

  onDataManagement(){
    this.router.navigate(['/management',this.id])
  }

  MapStart() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: 15.0210006, lng: 104.3137318 }
    });

    var marker = new google.maps.Marker({
      position: { lat: 15.0210006, lng: 104.3137318 },
      map: map,
      title: 'Hello World!'
    });

    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(document.getElementById('right-panel'));
  }

  routePath() {
    // this.path1 = this.selectCase.name
    // this.path2 = this.selectTeam.location 
    this.path1 = { lat: 15.1190945, lng: 104.3131757 } //ทีมช่วยเหลือ
    this.path2 = { lat: 15.105060, lng: 104.329312 }//จุดเกิดเหตุ

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

  routePathAuto() {

    this.itemRefTeam = this.afDB.list('/teams');
    this.itemRefTeam.snapshotChanges().subscribe(snapshot => {
      snapshot.forEach(snapshot => {

        this.routePath2(snapshot.key, snapshot.payload.val())

      })
    });

  }


  calRouteArray = [];
  routePath2(key, value_team) {
    this.calRouteArray = []; //Clear
    // console.log(this.teamRoute_val.location)
    this.path1 = value_team.location  //ทีมช่วยเหลือ
    this.path2 = this.item.report_location //จุดเกิดเหตุ

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


        var distance =
        {
          key: key,
          value: value_team,
          distance: response.routes[0].legs[0].distance.value,
          duration: response.routes[0].legs[0].duration.text
        }

        this.calRouteArray.push(distance)
        // console.log('distance = ' + JSON.stringify(this.calRouteArray))

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
    );

  }

  selectTeam_name = '';
  selectTeam;

  onSelectTeam(team: Team) {
    console.log(team)
    this.selectTeam_name = team.name
    this.selectTeam = team

    this.path1 = team.location  //ทีมช่วยเหลือ
    this.path2 = this.item.report_location //จุดเกิดเหตุ

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

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
    );
  }

  onStreetviewModal() {
    this.streetviewModal.show();

    var location = {
      lat: this.item.report_location.lat + 0.00000001,
      lng: this.item.report_location.lng + 0.00000001
    }

    setTimeout(() => {

      const itemsRef = this.afDB.list('requests');
      itemsRef.update(this.id, { report_location: location });

    }, 2000);

  }

  StreetViewPanorama(report_location) {
    // var fenway = { lat: 42.345573, lng: -71.098326 };
    var fenway = report_location;
    console.log(report_location)

    var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: fenway,
      zoom: 12
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

  streetViewTeamMonitoring(team) {
    // var fenway = { lat: 42.345573, lng: -71.098326 };
    var fenway = team.location;
    
    var map2 = new google.maps.Map(document.getElementById('map2-team'), {
      center: fenway,
      zoom: 16
    });
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano-team'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    map2.setStreetView(panorama);

  }

  onDirectionTeamModal() {
    this.directionTeamModal.show();
    this.selectTeam_name = '';
  }
  onDirectionTeam() {

    if (this.selectTeam.name == '') {
      console.log('please select team.')
    } else {
      const itemsRef = this.afDB.list('requests');
      itemsRef.update(this.id, { team_key: this.selectTeam.key ,missionStatus:'สั่งการ' , status : 'OnOperating' });
      this.directionTeamModal.hide();
    }

  }
  onMonitoringModal() {

    this.monitoringModal.show();

    const itemRefTeam = this.afDB.object(`teams/${this.item.team_key}`);
    itemRefTeam.snapshotChanges().subscribe(action => {

      this.team  = action.payload.val();
      console.log(this.team)
      this.streetViewTeamMonitoring(this.team)
      
    });

    var location = {
      lat: this.item.report_location.lat + 0.00000009,
      lng: this.item.report_location.lng + 0.00000009
    }

    this.Form.controls['messages'].setValue(this.item.messages);
    this.Form.controls['patient_history'].setValue(this.item.patient_history);

    if(this.item.patient_image_ByTeam == "assets/imgs/camera.jpg"){
      this.item.patient_image_ByTeam = "http://www.euforgen.org/fileadmin/templates/euforgen.org/Site/img/picture-not-available.jpg"
    }

    setTimeout(() => {
      const itemsRef = this.afDB.list('teams');
      itemsRef.update(this.item.team_key , { location : location });
      this.locationAmbulanceFormat(this.team.location)
    }, 3000);

  }

  locationAmbu;
  locationAmbulanceFormat(locationTeam) {
    var google_map_pos = new google.maps.LatLng(locationTeam);
    var google_maps_geocoder = new google.maps.Geocoder();
    google_maps_geocoder.geocode(
      { 'latLng': google_map_pos },
      (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results[0]) {
          this.locationAmbu = results[0].formatted_address;
          console.log(this.locationAmbu)
        }
      }
    );

  }

  radioModel: string = 'first';
  onRadioModel(value){
    this.radioModel = value
  }

  Form: FormGroup = this.builder.group({
    messages: ['xxx'],
    patient_history: ['xxx']
  })

  onSaveMonitoring(){
    const itemsRef = this.afDB.list('requests');
    // var value = JSON.parse( JSON.stringify(this.Form.value ))
    itemsRef.update( this.id , this.Form.value );
  }

  onMissionFinish(){
    const itemsRef = this.afDB.list('requests');
    itemsRef.update(this.id, {  missionStatus : 'เสร็จสิ้น', status : 'complete'} ) ;

  }

}
