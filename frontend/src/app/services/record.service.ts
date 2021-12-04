import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRecord } from '../components/record/IRecord';

const url = 'http://localhost:8080/api/records/';
@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }
  
  getRecords(): Observable<IRecord>{
    return this.http.get<IRecord>(url);
  }
  getRecordByid(email_id: any, cname_id: any, disease_code_id: any): Observable<IRecord>{
    return this.http.get<IRecord>(`${url}${email_id}/${cname_id}/${disease_code_id}`);
  }
  createRecord(data:any){
    return this.http.post(`${url}`, data);
  }
  updateRecord(email_id: any, cname_id: any, disease_code_id: any, data:any){
    return this.http.put(`${url}${email_id}/${cname_id}/${disease_code_id}`, data);
  }
  deleteRecord(email_id: any, cname_id: any, disease_code_id: any){
    return this.http.delete(`${url}${email_id}/${cname_id}/${disease_code_id}`);
  }
}
