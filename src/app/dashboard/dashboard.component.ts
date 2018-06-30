import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

declare const google: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  locations = [
    ['ศก _ อทพ', 15.0991806, 104.3317295, 4],
    ['Coogee Beach', 15.0991806, 104.3317295, 5],
    ['มหาวิทยาลัยราชภัฎศรีสะเกษ', 15.0848717, 104.3165883, 3],
    ['ศูนย์แสดงพันธุ์สัตว์น้ำจังหวัดศรีสะเกษ', 15.090685, 104.3375733, 2],
    ['ศก _ กล ', 15.1030427, 104.320862, 1]
  ];

  ngOnInit() {
    this.initMap();

  }


  initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(15.1050624, 104.3287273),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < this.locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.locations[i][1], this.locations[i][2]),
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP
          });
    }
  }
  

}
