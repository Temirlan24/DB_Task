import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../components/doctor/IDoctor';

const url = 'http://localhost:8080/api/doctor/';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient) { }
  
  getDoctors(): Observable<IDoctor>{
    return this.http.get<IDoctor>(url);
  }
  getDoctorById(id:any): Observable<IDoctor>{
    return this.http.get<IDoctor>(`${url}${id}`);
  }
  createDoctor(data:any){
    return this.http.post(`${url}`, data);
  }
  updateDoctor(data:any, id: any){
    return this.http.put(`${url}${id}`, data);
  }
  deleteDoctor(id:any){
    return this.http.delete(`${url}${id}`);
  }
}
