import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUser } from '../components/user/IUser';

const url = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(public http:HttpClient) { }

  getUsers(): Observable<IUser>{
    return this.http.get<IUser>(url);
  }
  createUser(data: any) {
    return this.http.post(`${url}`, data);
  }
  getUser(id: any):Observable<IUser>{
    return this.http.get<IUser>(`${url}${id}`)
  }
  updateUser(data: any, id: any) {
    return this.http.put(`${url}${id}`, data);
  }

  deleteUser(id: any) {
    return this.http.delete(`${url}${id}`);
  }
}
