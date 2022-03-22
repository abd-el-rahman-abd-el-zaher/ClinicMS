import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { PatientsComponent } from './Components/patients/patients.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NotFoundComponent,
    DoctorsComponent,
    EmployeesComponent,
    AppointmentsComponent,
    PatientsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
