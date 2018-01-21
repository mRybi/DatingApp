import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

constructor(private autHttp: AuthHttp) { }

getUsers(): Observable<User[]> {
    return this.autHttp.get(this.baseUrl + 'users')
    .map(response => <User[]>response.json())
    .catch(this.handleError);
}

getUser(id): Observable<User> {
    return this.autHttp
    .get(this.baseUrl + 'users/' + id)
    .map(response => <User>response.json())
    .catch(this.handleError);
}

updateUser(id: number, user: User) {
    return this.autHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
}

private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateError += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(
        modelStateError || 'Server error'
    );
}

}
