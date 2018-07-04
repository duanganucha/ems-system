import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../app/location'

@Component({
  selector: 'app-map3',
  templateUrl: './map3.component.html',
  styleUrls: ['./map3.component.scss']
})
export class Map3Component implements OnInit {
  position : Position = {
    lat  : 51.678418,
    lng : 7.809007,
    zoom : 10
  }
  itemRef: AngularFireObject<any>;

  item ;

  constructor(private afDB: AngularFireDatabase) { 

    this.itemRef = afDB.object('positions/-L4znibEOVYUzKeSSDNQ');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.item = action.payload.val();
      this.position.lat = this.item.lat
      this.position.lng = this.item.lng
      this.position.zoom = this.item.zoom

      console.log(this.item)
    });
  }
     
  ngOnInit() {
  //   const itemsRef = this.afDB.list('positions');
  //   itemsRef.push({'lat':15.1269661});
  //   itemsRef.push({'lng':104.306438});
  }
  id = '-L4znibEOVYUzKeSSDNQ';
  onSetMarker(event){    
    setTimeout(() => {
      var marker = new Location(event.coords.lat, event.coords.lng);
      const itemsRef = this.afDB.list('positions');
      itemsRef.update(this.id,marker);
    }, 2000);
  }
}

interface Position {
  lat : number,
  lng : number,
  zoom :number
}



