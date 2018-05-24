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
    ManagerComponent
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
      { path: 'detecting/:id', component: DetectingComponent },
      { path: 'monitoring', component: MonitoringComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'manager', component: ManagerComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'teams', component: TeamsComponent }
    ])
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
