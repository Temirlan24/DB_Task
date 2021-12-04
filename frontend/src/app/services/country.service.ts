import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ICountry } from '../components/country/ICountry';

const url = 'http://localhost:8080/api/country/';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(public http:HttpClient) { }

  getCountries(): Observable<ICountry>{
    return this.http.get<ICountry>(url);
  }
  createCountry(data: any) {
    return this.http.post(`${url}`, data);
  }
  getCountryById(id: any):Observable<ICountry>{
    return this.http.get<ICountry>(`${url}${id}`)
  }
  updateCountry(data: any, id: any) {
    return this.http.put(`${url}${id}`, data);
  }
  deleteCountry(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
