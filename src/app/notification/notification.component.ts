import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Router } from '@angular/router' 
import { AgmCoreModule } from '@agm/core';


declare var google: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent  {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  scene:string = ""

  constructor(private db: AngularFireDatabase,private router : Router) {
   
    this.itemsRef = db.list('test');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  onDelete(item) {
    this.itemsRef.remove(item);
  }

  onApprove(key){
    this.itemsRef.update(key, { scene : this.scene });
    this.itemsRef.update(key, { status : "Approve" });
    this.scene = "";
    this.router.navigate(['/detecting', key]);
  }

  onDrop(item){
    this.itemsRef.update(item.key, { scene : this.scene });
    this.itemsRef.update(item.key, { status : "Drop" });
    this.scene = "";
  }

}
