import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClassTeam } from '../app.interface';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AgmCoreModule } from '@agm/core';

import { Location } from '../../app/location'
import { Team } from '../team';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent   {

  @ViewChild('form') formModal: { show: Function, hide: Function };
  @ViewChild('deleteModal') deleteModal: { show: Function, hide: Function };
  itemRefTeam: AngularFireList<any>;
  teams: Observable<Team[]>;
  // itemsRef: AngularFireList<any>;
  // items: Observable<any[]>;
  key;

  lat: number = 15.1178138;
  lng: number = 104.3247774;

  location: Location;
  marker: Location;
  edit_check = false

  Form: FormGroup = this.builder.group({
    code: [null, Validators.required],
    image: [null, [
      Validators.required,
      Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)
    ]],
    name: [null, Validators.required],
    number_ambulance: [null, Validators.required],
    location: [null, Validators.required],
    detail: [null, Validators.required],
    level: [null, Validators.required]
  })

  
  constructor(
    private builder: FormBuilder,
    private afDB: AngularFireDatabase
  ) {

    // this.itemRefTeam = this.afDB.list('/teams');
    // this.items = this.afDB.list('teams').valueChanges();
    // console.log(this.items)

    this.itemRefTeam = this.afDB.list('/teams');
    this.teams = this.itemRefTeam.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
 

  onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
    // console.log(this.marker);
    const form = this.Form;
    form.controls['location'].setValue(this.marker);
  }

  checkCreate = "create";

  onSubmit() {
    //Create
    if (this.checkCreate == "create") {
      console.log(this.Form.value)

      const itemsRef = this.afDB.list('teams');
      itemsRef.push(this.Form.value);

      this.onReset();
      this.formModal.hide();

    } else {    //Update
      const itemsRef = this.afDB.list('teams');
      itemsRef.update(this.key, this.Form.value);
      this.onReset();
      this.formModal.hide();
    }
  }



  onEditForm(team: Team) {
    this.checkCreate = "update"
    this.edit_check = true
    this.key = team.key;
    console.log(team)
    const form = this.Form;
    form.controls['image'].setValue(team.image);
    form.controls['code'].setValue(team.code);
    form.controls['name'].setValue(team.name);
    form.controls['number_ambulance'].setValue(team.number_ambulance);
    form.controls['level'].setValue(team.level);
    this.marker = team.location;
    form.controls['location'].setValue(team.location);
    form.controls['detail'].setValue(team.detail);
    this.formModal.show();

  }

  onCreate(form) {
    this.onReset();
    form.show();
  }

  onDeleteForm(item) {
    const form = this.Form;
    // form.controls['name'].setValue(item.name);
    this.deleteModal.show();
  }

  onDelete() {
    const itemsRef = this.afDB.list('teams');
    console.log(this.key)
    itemsRef.remove(this.key);
    this.onReset()
    this.formModal.hide();
  }


  onReset() {
    this.Form.reset();
    // this.Items = this.Items.sort((a, b) => {
    //   return Date.parse(b.date.toString()) - Date.parse(a.date.toString())
    // })
  }

  getImageUrl() {
    if (this.Form.controls['image'].valid) {
      return this.Form.controls['image'].value;
    }
    return 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg';
  }


}
