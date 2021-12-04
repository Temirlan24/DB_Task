import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPublicServant } from '../components/public-servant/IPublicServant';

const url = 'http://localhost:8080/api/publicServant/';

@Injectable({
  providedIn: 'root'
})
export class PublicServantService {
  
  constructor(public http:HttpClient) { }

  getPublicServant(): Observable<IPublicServant>{
    return this.http.get<IPublicServant>(url);
  }
  createPublicServant(data: any) {
    return this.http.post(`${url}`, data);
  }
  getPublicServantById(id: any):Observable<IPublicServant>{
    return this.http.get<IPublicServant>(`${url}${id}`)
  }
  updatePublicServant(data: any, id: any) {
    return this.http.put(`${url}${id}`, data);
  }
  deletePublicServant(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
