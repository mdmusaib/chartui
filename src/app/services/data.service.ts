import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    //call the api to get chart data
    public fetchData(): Observable<any> {
        return this.http.get('https://qa-apis.icreditspace.com/apis/third-party/assignment/v1/random-chart-data/');
    }

    //call the api to login 
    public authLogin(request): Observable<any> {
        return this.http.post('https://qa-apis.icreditspace.com/apis/users/v1/login/', request);
    }


    //call the api to signup user
    public register(request): Observable<any> {
        return this.http.post('https://qa-apis.icreditspace.com/apis/users/v1/register/', request);
    }
}
