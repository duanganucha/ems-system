import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagementComponent } from '../management/management.component';
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent {

  itemRef: AngularFireObject<any>;
  item: Item;
  id;
  private icon = {
    url: ('../../assets/ambulance.svg'), 
    scaledSize: {
      height: 40,
      width: 40
    }
  };

  constructor(private afDB: AngularFireDatabase , private router :Router,private activeRoute :ActivatedRoute) {

    this.id = this.activeRoute.snapshot.params['id'];
    this.itemRef = afDB.object(`requests/${this.id}`);
    this.itemRef.snapshotChanges().subscribe(action => {

      this.item = action.payload.val();
      console.log(this.item)

    });

    // this.item = db.object('positions').valueChanges();

    // this.itemRef = db.object(`positions/-L4znibEOVYUzKeSSDNQ`);
    // this.item = this.itemRef.valueChanges();

    // this.itemRef = db.object(`positions/-L4znibEOVYUzKeSSDNQ`);
    // this.itemRef.snapshotChanges().subscribe(action => {

    //   this.item = action.payload.val();
    //   console.log(this.item)

    // });

    // this.itemRef = this.object('positions/-L4znibEOVYUzKeSSDNQ');
    // this.itemRef.snapshotChanges().subscribe(action => {
    //   this.itemRef = action.payload.val();
    //   // console.log(this.itemRef)
    //   console.log(action.type);
    //   console.log(action.key)
    //   console.log(action.payload.val())


    // });

  }

  onManamgement(){
    this.router.navigate(['/management',this.id]);
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
