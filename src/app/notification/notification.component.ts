import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Router } from '@angular/router'
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../../app/location'
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

declare var google: any;


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

  dispatch: DispatchClass = new DispatchClass();

  Form: FormGroup = this.builder.group({
    image: [null, [
      Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)
    ]],
    scene: [null, Validators.required],
    telNumber: [null, Validators.required],
    location: [ null, Validators.required],
    locationDetail: [null, Validators.required],
    moreDetail: [null, Validators.required],
    status: [null],
    clientTime : [null]
  })


  constructor(private afDB: AngularFireDatabase, private router: Router, private builder: FormBuilder) {

    this.itemsRef = afDB.list('requests');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  onSubmit(){
    this.Form.controls['status'].setValue('UnRead'); 
    this.Form.controls['clientTime'].setValue(Date.now()); 
    const itemsRef = this.afDB.list('requests');
    itemsRef.push(this.Form.value);

    this.onReset();
    this.formModal.hide();
  }



  onDelete(item) {
    this.itemsRef.remove(item);
  }

  OnManagement(form, item) {
    form.show();
    // this.StreetViewPanorama(item);
  }

  onManageData(key){
    this.router.navigate(['/management', key]);
  }

  onApprove(key) {
    this.itemsRef.update(key, { scene: this.scene });
    this.itemsRef.update(key, { status: "Approve" });
    this.scene = "";
    this.router.navigate(['/detecting', key]);
  }

  onDrop(item) {
    this.itemsRef.update(item.key, { scene: this.scene });
    this.itemsRef.update(item.key, { status: "Drop" });
    this.scene = "";
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
    form.controls['location'].setValue(this.marker);
    form.controls['locationDetail'].setValue(this.dispatch.locationDetail);

    var google_map_pos = new google.maps.LatLng(event.coords.lat, event.coords.lng);
    var google_maps_geocoder = new google.maps.Geocoder();
    google_maps_geocoder.geocode(
      { 'latLng': google_map_pos },
      (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results[0]) {
          var locationDetail: string = results[0].formatted_address;
          this.dispatch.locationDetail = locationDetail;
        }
      }
    );

  }


  getImageUrl() {
    if (this.Form.controls['image'].valid) {
      return this.Form.controls['image'].value;
    }
    return 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
  }
}

class DispatchClass {
  telNumber = "";
  clienttime = Date.now();
  imageURL = "";
  location: Location;
  locationDetail = "";
  place_id = ""
}

// teamName
// teamLevel
// numberMision
// id-key
// location
// locationDetail
// image
// reportsymptom
// reportWho
// reportWay
// reportNumber
// patientName
// patientAge
// patientHN
// patientID
// symptom_first
// vitalsign1_GSC
// vitalsign1_pupil
// vitalsign1_o2sat
// vitalsign1_BP
// vitalsign1_pulse
// vitalsign1_RR
// vitalsign1_temperature

// symptom_second
// vitalsign2_GSC
// vitalsign2_pupil
// vitalsign2_o2sat
// vitalsign2_BP
// vitalsign2_pulse
// vitalsign2_RR
// vitalsign2_temperature

// time_report
// time_command
// time_depart
// time_arrive_scene
// time_leave
// time_arrive_hospital
// time_arrive_end
// km_start
// km_depart
// km_hospital
// km_end

// treatment
// member_doctor
// member_one
// member_two
// member_three





