import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CountryComponent } from './components/country/country.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { RecordComponent } from './components/record/record.component';
import { SpecializeComponent } from './components/specialize/specialize.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { DiseaseComponent } from './components/disease/disease.component';
import { PublicServantComponent } from './components/public-servant/public-servant.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CountryComponent,
    UserComponent,
    RecordComponent,
    SpecializeComponent,
    DoctorComponent,
    DiscoverComponent,
    DiseaseComponent,
    PublicServantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
