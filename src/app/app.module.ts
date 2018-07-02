import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { SideleftComponent } from './sideleft/sideleft.component';
import { ContentComponent } from './content/content.component';
import { DetectingComponent } from './detecting/detecting.component';

import { environment } from '../environments/environment';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { NotificationComponent } from './notification/notification.component';
import { TeamsComponent } from './teams/teams.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { MapsComponent } from './maps/maps.component';
import { ManagerComponent } from './manager/manager.component';
import { Map2Component } from './map2/map2.component';
import { ManagementComponent } from './management/management.component';
import { ReversePipe } from './reverse.pipe';
import { Map3Component } from './map3/map3.component';
import { Detecting2Component } from './detecting2/detecting2.component';
import { Map4Component } from './map4/map4.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SideleftComponent,
    ContentComponent,
    DashboardComponent,
    DetectingComponent,
    MonitoringComponent,
    NotificationComponent,
    TeamsComponent,
    MapsComponent,
    ManagerComponent,
    Map2Component,
    ManagementComponent,
    ReversePipe,
    Map3Component,
    Detecting2Component,
    Map4Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCF3aH2Bk1v1-AOIaeDWFXzfsNjK0dh558'
    }),
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detecting', component: DetectingComponent },
      { path: 'detecting2', component: Detecting2Component },
      { path: 'detecting/:id', component: DetectingComponent },
      { path: 'monitoring', component: MonitoringComponent },
      { path: 'monitoring/:id', component: MonitoringComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'manager', component: ManagerComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'management/:id', component: ManagementComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'maps2', component: Map2Component },
      { path: 'map3', component: Map3Component },
      { path: 'map4', component: Map4Component },
      { path: 'teams', component: TeamsComponent }
    ])
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
