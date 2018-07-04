import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { DispatchClass } from '../interface';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  item: DispatchClass;
  id;

  Form: FormGroup = this.builder.group({
    key: [{ value: 'xxx-xxx-xxx', disabled: true }, Validators.required],
    status: [null, Validators.required],
    missionNumber: [''],
    missionStatus: [''],

    team_key: [''],
    team_Name: [''],
    team_Code: [''],
    team_AmbulanceNumber:[''],
    team_Level: [''],

    scene_type: [''],
    report_time: [''],
    report_location: [''],
    report_locationDetail: [''],
    report_scene: [''],
    report_image: ['https://www.universitycoop.com/c.4510185/site-dev/img/no_image_available.jpeg?resizeid=3&resizeh=600&resizew=600'],
    report_symptom: [''],
    report_moreDetail: [''],

    report_telNumber: [''],
    report_Who: [''],
    report_Way: [''],

    patient_Name: [''],
    patient_Age: [''],
    patient_HN: [''],
    patient_ID: [''],
    patient_image_ByTeam: [''],

    vitalsign1_symptom_first: [''],
    vitalsign1_GSC: [''],
    vitalsign1_pupil: [''],
    vitalsign1_o2sat: [''],
    vitalsign1_BP_Diastolic: [''],
    vitalsign1_BP_Systolic: [''],
    vitalsign1_pulse: [''],
    vitalsign1_RR: [''],
    vitalsign1_temperature: [''],
    vitalsign1_DTX: [''],

    vitalsign2_symptom_second: [''],
    vitalsign2_GSC: [''],
    vitalsign2_pupil: [''],
    vitalsign2_o2sat: [''],
    vitalsign2_BP_Diastolic: [''],
    vitalsign2_BP_Systolic: [''],
    vitalsign2_pulse: [''],
    vitalsign2_RR: [''],
    vitalsign2_temperature: [''],
    vitalsign2_DTX: [''],

    time_report: [''],
    time_command: [''],
    time_depart: [''],
    time_arrive_scene: [''],
    time_leave_scene: [''],
    time_arrive_hospital: [''],
    time_arrive_end: [''],

    km_start: [''],
    km_depart: [''],
    km_hospital: [''],
    km_end: [''],

    diagnosis: [''],
    treatment: [''],

    member_doctor: [''],
    member_one: [''],
    member_two: [''],
    member_three: [''],
    member_driver: [''],

  })

  constructor(
    private builder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private afDB: AngularFireDatabase
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.itemRef = afDB.object(`requests/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {

      this.item = action.payload.val();
      // console.log(this.item.report_locationDetail)
      this.onFormManagement(this.item);


    });
  }
  ngOnInit() {
    // this.onFormManagement();
  }
  onFormManagement(item) {

    const form = this.Form;
    form.controls['key'].setValue(this.id);
    form.controls['status'].setValue(item.status);
    form.controls['missionNumber'].setValue(item.missionNumber);
    form.controls['missionStatus'].setValue(item.missionStatus);

    form.controls['team_key'].setValue(item.team_key);
    form.controls['team_Name'].setValue(item.team_Name);
    form.controls['team_Code'].setValue(item.team_Code);
    form.controls['team_AmbulanceNumber'].setValue(item.team_AmbulanceNumber);
    form.controls['team_Level'].setValue(item.team_Level);

    form.controls['scene_type'].setValue(item.scene_type);
    form.controls['report_time'].setValue(item.report_time);
    form.controls['report_location'].setValue(item.report_location);
    form.controls['report_locationDetail'].setValue(item.report_locationDetail);
    form.controls['report_scene'].setValue(item.report_scene);
    form.controls['report_image'].setValue(item.report_image);
    form.controls['report_symptom'].setValue(item.report_symptom);
    form.controls['report_moreDetail'].setValue(item.report_moreDetail);

    form.controls['report_telNumber'].setValue(item.report_telNumber);
    form.controls['report_Who'].setValue(item.report_Who);
    form.controls['report_Way'].setValue(item.report_Way);
    form.controls['patient_Name'].setValue(item.patient_Name);
    form.controls['patient_Age'].setValue(item.patient_Age);
    form.controls['patient_HN'].setValue(item.patient_HN);
    form.controls['patient_ID'].setValue(item.patient_ID);
    form.controls['patient_image_ByTeam'].setValue(item.patient_image_ByTeam);

    form.controls['vitalsign1_symptom_first'].setValue(item.vitalsign1_symptom_first);
    form.controls['vitalsign1_GSC'].setValue(item.vitalsign1_GSC);
    form.controls['vitalsign1_pupil'].setValue(item.vitalsign1_pupil);
    form.controls['vitalsign1_o2sat'].setValue(item.vitalsign1_o2sat);
    form.controls['vitalsign1_BP_Diastolic'].setValue(item.vitalsign1_BP_Diastolic);
    form.controls['vitalsign1_BP_Systolic'].setValue(item.vitalsign1_BP_Systolic);
    form.controls['vitalsign1_pulse'].setValue(item.vitalsign1_pulse);
    form.controls['vitalsign1_RR'].setValue(item.vitalsign1_RR);
    form.controls['vitalsign1_temperature'].setValue(item.vitalsign1_temperature);
    form.controls['vitalsign1_DTX'].setValue(item.vitalsign1_DTX);

    form.controls['vitalsign2_symptom_second'].setValue(item.vitalsign2_symptom_second);
    form.controls['vitalsign2_GSC'].setValue(item.vitalsign2_GSC);
    form.controls['vitalsign2_pupil'].setValue(item.vitalsign2_pupil);
    form.controls['vitalsign2_o2sat'].setValue(item.vitalsign2_o2sat);
    form.controls['vitalsign2_BP_Diastolic'].setValue(item.vitalsign2_BP_Diastolic);
    form.controls['vitalsign2_BP_Systolic'].setValue(item.vitalsign2_BP_Systolic);
    form.controls['vitalsign2_pulse'].setValue(item.vitalsign2_pulse);
    form.controls['vitalsign2_RR'].setValue(item.vitalsign2_RR);
    form.controls['vitalsign2_temperature'].setValue(item.vitalsign2_temperature);
    form.controls['vitalsign2_DTX'].setValue(item.vitalsign2_DTX);

    form.controls['time_report'].setValue(item.time_report);
    form.controls['time_command'].setValue(item.time_command);
    form.controls['time_depart'].setValue(item.time_depart);
    form.controls['time_arrive_scene'].setValue(item.time_arrive_scene);
    form.controls['time_leave_scene'].setValue(item.time_leave_scene);
    form.controls['time_arrive_hospital'].setValue(item.time_arrive_hospital);
    form.controls['time_arrive_end'].setValue(item.time_arrive_end);

    form.controls['km_start'].setValue(item.km_start);
    form.controls['km_depart'].setValue(item.km_depart);
    form.controls['km_hospital'].setValue(item.km_hospital);
    form.controls['km_end'].setValue(item.km_end);

    form.controls['diagnosis'].setValue(item.time_depart);
    form.controls['treatment'].setValue(item.time_depart);

    form.controls['member_doctor'].setValue(item.member_doctor);
    form.controls['member_one'].setValue(item.member_one);
    form.controls['member_two'].setValue(item.member_two);
    form.controls['member_three'].setValue(item.member_three);
    form.controls['member_driver'].setValue(item.member_driver);

  }
  onSubmit() {
    // console.log(this.Form.value)
    const itemsRef = this.afDB.list('requests');
    var value = JSON.parse( JSON.stringify(this.Form.value ))
    // console.log(value)
    itemsRef.update( this.id , value );
  }

  onDeleteItem(){
    const itemsRef = this.afDB.list('requests');
    itemsRef.remove( this.id );
    this.router.navigate(['/notification']);
  }
  onCancel(){
    this.router.navigate(['/notification']);
  }
}

