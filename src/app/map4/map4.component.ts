import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../app/location'
import { makePropDecorator } from '@angular/core/src/util/decorators';
import { Team } from '../team';

@Component({
  selector: 'app-map4',
  templateUrl: './map4.component.html',
  styleUrls: ['./map4.component.scss']
})
export class Map4Component implements OnInit {

  position : Position = {
    lat  : 51.678418,
    lng : 7.809007,
  }
  zoom = 10
  itemRef: AngularFireObject<any>;

  item :Team ;

  constructor(private afDB: AngularFireDatabase) { 

    this.itemRef = afDB.object('teams/-LDCZwzmZkrk1ll-gyAE');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.item = action.payload.val();
      this.position.lat = this.item.location.lat
      this.position.lng = this.item.location.lng

      console.log(this.item)
    });
  }
     
  ngOnInit() {
  //   const itemsRef = this.afDB.list('positions');
  //   itemsRef.push({'lat':15.1269661});
  //   itemsRef.push({'lng':104.306438});
  }
  id = '-LDCZwzmZkrk1ll-gyAE';
  onSetMarker(event){

    var marker = new Location(event.coords.lat, event.coords.lng);
    console.log(marker)
    const itemsRef = this.afDB.list('teams');
    itemsRef.update(this.id,{ location : marker });
  }
}

interface Position {
  lat : number,
  lng : number,
}



