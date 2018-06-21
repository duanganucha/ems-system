import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { DispatchClass } from '../interface';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  item : DispatchClass  ;
  id ;

  Form: FormGroup = this.builder.group({
    key : [{value:'xxx-xxx-xxx',disabled: true}, Validators.required],
    status : [null, Validators.required],
    missionNumber: ['', Validators.required],
    
    teamName: ['', Validators.required],
    teamCode: ['', Validators.required],
    teamLevel : ['', Validators.required],
    
    scene_type: ['', Validators.required],
    report_time: ['', Validators.required],
    report_location: ['', Validators.required],
    report_locationDetail: ['', Validators.required],
    report_scene: ['', Validators.required],
    report_image: ['', Validators.required],
    report_symptom: ['', Validators.required],
    report_moreDetail: ['', Validators.required],
    
    report_telNumber: ['', Validators.required],
    report_Who: ['', Validators.required],
    report_Way: ['', Validators.required],

    patient_Name: ['', Validators.required],
    patient_Age: ['', Validators.required],
    patient_HN: ['', Validators.required],
    patient_ID: ['', Validators.required],
    patient_image_ByTeam: ['', Validators.required],

    vitalsign1_symptom_first: ['', Validators.required],
    vitalsign1_GSC: ['', Validators.required],
    vitalsign1_pupil: ['', Validators.required],
    vitalsign1_o2sat: ['', Validators.required],
    vitalsign1_BP: ['', Validators.required],
    vitalsign1_pulse: ['', Validators.required],
    vitalsign1_RR: ['', Validators.required],
    vitalsign1_temperature: ['', Validators.required],
    vitalsign1_DTX: ['', Validators.required],

    vitalsign2_symptom_second: ['', Validators.required],
    vitalsign2_GSC: ['', Validators.required],
    vitalsign2_pupil: ['', Validators.required],
    vitalsign2_o2sat: ['', Validators.required],
    vitalsign2_BP: ['', Validators.required],
    vitalsign2_pulse: ['', Validators.required],
    vitalsign2_RR: ['', Validators.required],
    vitalsign2_temperature: ['', Validators.required],
    vitalsign2_DTX: ['', Validators.required],

    time_report: ['', Validators.required],
    time_command: ['', Validators.required],
    time_depart: ['', Validators.required],
    time_arrive_scene: ['', Validators.required],
    time_leave_scene: ['', Validators.required],
    time_arrive_hospital: ['', Validators.required],
    time_arrive_end: ['', Validators.required],

    km_start: ['', Validators.required],
    km_depart: ['', Validators.required],
    km_hospital: ['', Validators.required],
    km_end: ['', Validators.required],

    diagnosis: ['', Validators.required],
    treatment: ['', Validators.required],
   
    member_doctor: ['', Validators.required],
    member_one: ['', Validators.required],
    member_two: ['', Validators.required],
    member_three: ['', Validators.required],
    member_driver: ['', Validators.required],

  })
  
  constructor ( 
    private builder: FormBuilder,
    private activeRoute :ActivatedRoute,
    private afDB :AngularFireDatabase
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
  onFormManagement(item){

    const form = this.Form;
    form.controls['key'].setValue(this.id);
    form.controls['status'].setValue(item.status);
    form.controls['missionNumber'].setValue(item.missionNumber);
   
    form.controls['teamName'].setValue(item.teamName);
    form.controls['teamCode'].setValue(item.teamCode);
    form.controls['teamLevel'].setValue(item.teamLevel);
   
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
    form.controls['vitalsign1_BP'].setValue(item.vitalsign1_BP);
    form.controls['vitalsign1_pulse'].setValue(item.vitalsign1_pulse);
    form.controls['vitalsign1_RR'].setValue(item.vitalsign1_RR);
    form.controls['vitalsign1_temperature'].setValue(item.vitalsign1_temperature);
    form.controls['vitalsign1_DTX'].setValue(item.vitalsign1_DTX);


    form.controls['vitalsign2_symptom_second'].setValue(item.vitalsign2_symptom_second);
    form.controls['vitalsign2_GSC'].setValue(item.vitalsign2_GSC);
    form.controls['vitalsign2_pupil'].setValue(item.vitalsign2_pupil);
    form.controls['vitalsign2_o2sat'].setValue(item.vitalsign2_o2sat);
    form.controls['vitalsign2_BP'].setValue(item.vitalsign2_BP);
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
  onSubmit(){
    console.log(this.Form.value)
    
  }

}

