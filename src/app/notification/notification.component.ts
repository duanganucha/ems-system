import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Router } from '@angular/router'
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../../app/location'
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

import { DispatchClass } from '../../app/interface'

declare var google: any;


DispatchClass
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @ViewChild('formNewNotify') formModal: { show: Function, hide: Function };

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  scene: string = ""


  latInit: number = 15.1178138;
  lngInit: number = 104.3247774;
  marker: Location;
  locationDetail :any;

  dispatch: DispatchClass ;

  Form: FormGroup = this.builder.group({
    report_image: [null, [
      Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)
    ]],
    report_scene: [null, Validators.required],
    report_telNumber: [null, Validators.required],
    report_location: [null, Validators.required],
    report_locationDetail: [null, Validators.required],
    report_moreDetail: [null, Validators.required],
    status: [null],
    report_time: [null]
  })


  constructor(private afDB: AngularFireDatabase, private router: Router, private builder: FormBuilder) {

    this.itemsRef = afDB.list('requests');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  onSubmit() {
    this.Form.controls['status'].setValue('UnRead');
    this.Form.controls['report_time'].setValue(Date.now());
    const itemsRef = this.afDB.list('requests');
    itemsRef.push(this.Form.value);

    this.onReset();
    this.formModal.hide();
  }

  onDelete(item) {
    this.itemsRef.remove(item);
  }

  OnManagement(form, item) {
    this.itemsRef.update(item.key, { status: "Read" });
    form.show();
  }

  onManageData(key) {
    this.router.navigate(['/management', key]);
  }

  onApprove(key) {
    this.itemsRef.update(key, { status: "Approve" });
    this.router.navigate(['/detecting', key]);
  }

  onDrop(item) {
    // this.itemsRef.update(item.key, { scene: this.scene });
    this.itemsRef.update(item.key, { status: "Drop" });
  }


  StreetViewPanorama(item) {
    console.log(item.longitude)
    console.log(item.latitude)

    // var fenway = { lat: 42.345573, lng: -71.098326 };
    var fenway = { lat: item.latitude, lng: item.longitude };

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

  onCreate(form) {
    this.onReset();
    form.show();
  }
  onReset() {
    this.Form.reset();
    // this.Items = this.Items.sort((a, b) => {
    //   return Date.parse(b.date.toString()) - Date.parse(a.date.toString())
    // })
  }
  onSetMarker(event: any) {

    this.marker = new Location(event.coords.lat, event.coords.lng);
    // console.log(this.marker);
    const form = this.Form;
    form.controls['report_location'].setValue(this.marker);
    
    var google_map_pos = new google.maps.LatLng(event.coords.lat, event.coords.lng);
    var google_maps_geocoder = new google.maps.Geocoder();
    google_maps_geocoder.geocode(
      { 'latLng': google_map_pos },
      (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results[0]) {
          this.locationDetail  = results[0].formatted_address;
          form.controls['report_locationDetail'].setValue(this.locationDetail);
        }
      }
    );

  }


  getImageUrl() {
    if (this.Form.controls['report_image'].valid) {
      return this.Form.controls['report_image'].value;
    }
    return 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
  }
}




   //   telNumber = "",
   //   clienttime = Date.now(),
   //   imageURL = "",
   //   location: Location,
   //   locationDetail: any, 
   //   place_id = "",


//    export class DispatchClass {

//     constructor(
  
//       public clienttime = Date.now(),
//       public id_key: string,
      
//       public teamName: string,
//       public teamLevel: string,
//       public numberMision: string,
//       public location: Location,
//       public locationDetail: string,
//       public imageReport: string,
//       public imageByTeam: string,
      
//       public scene_type :string,
//       public scene_detail :string,

//       public reportsymptom: string,
//       public reportWho: string,
//       public reportWay: string,
//       public reportNumber: string,
  
//       public patientName: string,
//       public patientAge: string,
//       public patientHN: string,
//       public patientID: string,
  
//       public symptom_first: string,
//       public vitalsign1_GSC: string,
//       public vitalsign1_pupil: string,
//       public vitalsign1_o2sat: number,
//       public vitalsign1_BP: string,
//       public vitalsign1_pulse: number,
//       public vitalsign1_RR: number,
//       public vitalsign1_temperature: number,
  
//       public symptom_second: string,
//       public vitalsign2_GSC: string,
//       public vitalsign2_pupil: string,
//       public vitalsign2_o2sat: number,
//       public vitalsign2_BP: string,
//       public vitalsign2_pulse: number,
//       public vitalsign2_RR: number,
//       public vitalsign2_temperature: number,
  
//       public time_report: string,
//       public time_command: string,
//       public time_depart: string,
//       public time_arrive_scene: string,
//       public time_leave: string,
//       public time_arrive_hospital: string,
//       public time_arrive_end: string,
//       public km_start: string,
//       public km_depart: string,
//       public km_hospital: string,
//       public km_end: string,
  
//       public treatment: string,
//       public member_doctor: string,
//       public member_one: string,
//       public member_two: string,
//       public member_three: string,
//       public member_driver: string
  
//     ) { }      
// }
