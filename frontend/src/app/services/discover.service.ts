import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscover } from '../components/discover/IDiscover';


const url = 'http://localhost:8080/api/discover/';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  
  constructor(public http:HttpClient) { }

  getDiscoveries(): Observable<IDiscover>{
    return this.http.get<IDiscover>(url);
  }
  createDiscover(data: any) {
    return this.http.post(`${url}`, data);
  }
  getDiscoverById(cname_id: any, disease_code_id: any):Observable<IDiscover>{
    return this.http.get<IDiscover>(`${url}${cname_id}/${disease_code_id}`)
  }
  updateDiscover(cname_id: any, disease_code_id: any, data:any) {
    return this.http.put(`${url}${cname_id}/${disease_code_id}`, data);
  }

  deleteDiscover(cname_id: any, disease_code_id: any) {
    return this.http.delete(`${url}${cname_id}/${disease_code_id}`);
  }
}
