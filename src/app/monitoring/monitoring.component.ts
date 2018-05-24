import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent {

  itemRef: AngularFireObject<any>;

  private icon = {
    url: ('../../assets/ambulance.svg'), 
    scaledSize: {
      height: 40,
      width: 40
    }
  };

  constructor(private db: AngularFireDatabase) {

    // this.item = db.object('positions').valueChanges();

    // this.itemRef = db.object(`positions/-L4znibEOVYUzKeSSDNQ`);
    // this.item = this.itemRef.valueChanges();

    // this.itemRef = db.object(`positions/-L4znibEOVYUzKeSSDNQ`);
    // this.itemRef.snapshotChanges().subscribe(action => {

    //   this.item = action.payload.val();
    //   console.log(this.item)

    // });

    this.itemRef = db.object('positions/-L4znibEOVYUzKeSSDNQ');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.itemRef = action.payload.val();
      // console.log(this.itemRef)
      console.log(action.type);
      console.log(action.key)
      console.log(action.payload.val())


    });

  }

}
