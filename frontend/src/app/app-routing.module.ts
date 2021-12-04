import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { RecordComponent } from './components/record/record.component';
import { UserComponent } from './components/user/user.component';
import { DiseaseComponent } from './components/disease/disease.component';
import { PublicServantComponent } from './components/public-servant/public-servant.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DiscoverService } from './services/discover.service';
import { DiscoverComponent } from './components/discover/discover.component';
import { SpecializeComponent } from './components/specialize/specialize.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: 'country', component: CountryComponent },
  { path: 'users', component: UserComponent },
  { path: 'records', component: RecordComponent },
  { path: 'disease', component: DiseaseComponent },
  { path: 'publicServant', component: PublicServantComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'specialize', component: SpecializeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
