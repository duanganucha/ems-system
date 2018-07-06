import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Router } from '@angular/router'
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../../app/location'

import { DispatchClass } from '../../app/interface'

declare var google: any;


DispatchClass
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild('formNewNotify') formModal: { show: Function, hide: Function };

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  scene: string = ""


  latInit: number = 15.1178138;
  lngInit: number = 104.3247774;
  marker: Location;
  locationDetail: any;

  dispatch: DispatchClass;

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

    // this.items = afDB.list('requests', ref => ref.orderByChild('report_time')).snapshotChanges().map(result => {
    //   return result.reverse();
    // })
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  editForm: FormGroup;
  levelsMission : Array<string> = ['Emergency', 'Urgency', 'Non-Urgency', 'Dead']
  levelsMission2  = {1:'Emergency', 2:'Urgency', 3:'Non-Urgency', 4:'Dead'}

  scenes_type : Array<string> = ["ปวดท้อง/หลัง", "2. แพ้ ", "3. สัตว์กัด", "4. เลือดออก", "5. หายใจลำบาก/ติดขัด", "6. หัวใจหยุดเต้น", "7. เจ็บแน่นทรวงอก/หัวใจ", "8. สำลัก/อุดกั้นทางเดินหายใจ", "9. เบาหวาน", "10. ภาวะฉุกเฉินเหตุสิ่งแวดล้อม", "11. [เว้นว่าง]", "12. ปวดศีรษะ/ทางตา/หู/คอ/จมูก", "13. ภาวะทางจิตประสาท/อารมณ์", "14. พิษ/รับยาเกินขนาด", "15. มีครรภ์/คลอด/นรีเวช", "16. ชัก/มีสัญญานบอกเหตุการชัก", "17. ป่วย/อ่อนเพลีย", "18. อัมพาต กล้ามเนื้ออ่อนแรง/เฉียบพลัน", "19. ไม่รู้สติ/ไม่ตอบสนอง/หมดสติชั่ววูบ", "20. เด็ก (กุมารเวชกรรม)", "21. ถูกทำร้าย", "22. ไหม้/Burnไฟฟ้าช๊อต", "23. ตกน้ำ/บาดเจ็บทางน้ำ", "24. พลัดตกหกล้ม/อุบัติเหตุ/เจ็บปวด", "25. อุบัติเหตุยานยนต์"];

  ngOnInit(): void {

    this.editForm = this.builder.group({
      missionLevel : null ,
      scene_type : null,
      report_locationDetail : ''
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

  OnManagement(form, item: DispatchClass ) {
    if (item.status == "UnRead") {
      this.itemsRef.update(item.key, { status: "Read" });
      console.log('status read')
    }
    form.show();

    this.editForm.controls['missionLevel'].setValue(item.missionLevel)
    this.editForm.controls['scene_type'].setValue(item.scene_type)
    this.editForm.controls['report_locationDetail'].setValue(item.report_locationDetail)
  }

  onEdit(item){
    this.itemsRef.update(item.key , this.editForm.value )
  }

  onManageData(item :DispatchClass) {
    this.onEdit(item);
    this.router.navigate(['/management', item.key]);
  }

  onApprove(key) {
    this.itemsRef.update(key, { status: "Approve" });
    this.router.navigate(['/detecting', key]);
  }

  onDrop(item) {
    // this.itemsRef.update(item.key, { scene: this.scene });
    this.itemsRef.update(item.key, { status: "Drop" });
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
          this.locationDetail = results[0].formatted_address;
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




  