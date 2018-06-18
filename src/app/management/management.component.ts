import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Casedetail } from '../case-detail';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  item: Casedetail;
  id ;
  mission : MissionClass[] ;

  Form: FormGroup = this.builder.group({
    team: ["", Validators.required],
    teamLevel : ["", Validators.required],
    missionNumber: ["", Validators.required],
    key : [{value:'sdfsw-wer-sdf',disabled: true}, Validators.required],

    locationDetail: ["", Validators.required],
    latitude  : ["", Validators.required],
    longitude : ["", Validators.required],
    image : ["", Validators.required],

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
        console.log(this.item)
  
      });
    }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.Form.value)
  }

}

class MissionClass {
  id :string;
  team :string;
  teamLevel :string;
  locationDetail :string;
  location : {
    lat :string,
    lng :string
  }
}
