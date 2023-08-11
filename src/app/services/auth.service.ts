import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { UserInvestiments } from '../models/userInvestiments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {  }




  public getUser(id: number): Observable<UserInvestiments> {

    return this.http.get<UserInvestiments>(
      'https://localhost:7252/user/' + id,{
        responseType: 'json'
      }
    );
  }

  public login(user: Login): Observable<Token> {
    return this.http.post<any>(
      'https://localhost:7252/api/Auth/login',
      user, {
      responseType: 'json',
    }
    );
  }

}
