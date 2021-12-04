import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ISpecialize } from '../components/specialize/ISpecialize';


const url = 'http://localhost:8080/api/specialize/';

@Injectable({
  providedIn: 'root'
})
export class SpecializeService {

  constructor(private http: HttpClient) { }
  
  getSpecialize(): Observable<ISpecialize>{
    return this.http.get<ISpecialize>(url);
  }
  getSpecializeByid(specialize_id:any, email_id:any): Observable<ISpecialize>{
    return this.http.get<ISpecialize>(`${url}${specialize_id}/${email_id}`);
  }
  createSpecialize(data:any){
    return this.http.post(`${url}`, data);
  }
  updateSpecialize(specialize_id:any, email_id:any, data:any){
    return this.http.put(`${url}${specialize_id}/${email_id}`, data);
  }
  deleteSpecialize(specialize_id:any, email_id:any){
    return this.http.delete(`${url}${specialize_id}/${email_id}`);
  }
}
