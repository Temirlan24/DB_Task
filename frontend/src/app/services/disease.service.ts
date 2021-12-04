import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IDisease } from '../components/disease/IDisease';
const url = 'http://localhost:8080/api/disease/';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(private http:HttpClient) { }
  getDiseases(): Observable<IDisease>{
    return this.http.get<IDisease>(url);
  }
  createDisease(data: any) {
    return this.http.post(`${url}`, data);
  }
  getDiseaseById(id: any):Observable<IDisease>{
    return this.http.get<IDisease>(`${url}${id}`)
  }
  updateDisease(data: any, id: any) {
    return this.http.put(`${url}${id}`, data);
  }
  deleteDisease(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
