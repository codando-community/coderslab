import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  private user_id = localStorage.getItem('id');
  public userList;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:1000/user';
  }

  public createUser(body: object) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(`${this.url}/create`, body, httpOptions)
      .toPromise();
  }

  public getUserById() {
    return this.http
      .get<any>(`${this.url}/read/byId/${this.user_id}`)
      .toPromise();
  }

  public getUserList() {
    return this.http.get<any>(`${this.url}/read/all`).toPromise();
  }

  public updateUser(body: any) {
    body._id = this.user_id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put<any>(`${this.url}/update/${this.user_id}`, body, httpOptions)
      .toPromise();
  }

  public deleteUser() {
    return this.http
      .delete<any>(`${this.url}/delete/${this.user_id}`)
      .toPromise();
  }

  public listUsers(data) {
    this.userList = [];

    data.map((user) => {
      const obj = {
        id: user._id,
        username: user.username,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        discord_id: user.discord_id,
        github_id: user.github_id,
        password: user.password,
      };
      this.userList.push(obj);
    });

    return this.userList;
  }

  public login(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(`${this.url}/login`, body, httpOptions)
      .toPromise();
  }
}
