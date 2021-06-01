import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class UserService {
    private url: string;
    private user_id: string = "60ac594c68ec2ca3d561db6f";

    constructor(private http: HttpClient) {
        this.url = "http://localhost:1000"
    }

    public createUser(body: object) {
        const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json"}) };
        return this.http.post<any>(`${this.url}/user/create`, body, httpOptions).toPromise();
    }
    
    public getUserById() {
        return this.http.get<any>(`${this.url}/user/read/byId/${this.user_id}`).toPromise();   
    }

    public getUserList() {
        return this.http.get<any>(`${this.url}/user/read/all`).toPromise();
    }

    public updateUser(body: object) {
        body["_id"] = this.user_id

        const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json"}) };
        return this.http.put<any>(`${this.url}/user/update/${this.user_id}`, body, httpOptions).toPromise();
    }

    public deleteUser() {
        return this.http.delete<any>(`${this.url}/user/delete/${this.user_id}`).toPromise();
    }

}