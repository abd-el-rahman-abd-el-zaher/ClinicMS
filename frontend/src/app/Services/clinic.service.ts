import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import { ClinicServiceClass } from '../Components/Model/clinic-service';
import { Doctor } from '../Components/Model/doctor';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(public http:HttpClient) { }

  clinicServiceUrl:string="http://localhost:8080/clinicservice";
  
  getAllServices(){
    return this.http.get<ClinicServiceClass[]>(this.clinicServiceUrl)
      .pipe(catchError(this.handleError));
  }

  AddService(ser:ClinicServiceClass){
    return this.http.post<ClinicServiceClass>(this.clinicServiceUrl,ser)
      .pipe(catchError(this.handleError));
  }
  UpdateService(ser:ClinicServiceClass){
    return this.http.put<ClinicServiceClass>(this.clinicServiceUrl,ser)
      .pipe(catchError(this.handleError));
  }
  delete(id:string){
    return this.http.delete(this.clinicServiceUrl,{
      body:{_id:id},
    })
  }
  getOneServices(id:Object){
    return this.http.post(this.clinicServiceUrl+"/one",{
      _id:id
    }).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, JSON.stringify(error.error));
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
