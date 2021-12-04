import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IDiseaseType } from '../components/disease/IDeseaseType';


const url = 'http://localhost:8080/api/diseaseType/';

@Injectable({
  providedIn: 'root'
})
export class DiseaseTypeService {

  constructor(private http: HttpClient) { }

  getDiseaseType(){
    return this.http.get(url);
  }
  createDiseaseType(data: any) {
    return this.http.post(`${url}`, data);
  }
  getDiseaseTypeById(id: any):Observable<IDiseaseType>{
    return this.http.get<IDiseaseType>(`${url}${id}`)
  }
  updateDiseaseType(data: any, id: any) {
    return this.http.put(`${url}${id}`, data);
  }
  deleteDiseaseType(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
