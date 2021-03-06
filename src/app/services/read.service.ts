/**
 * Created by Abhi on 10/9/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Student} from './../student';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ReadService{
    constructor (private http: Http) {}
    private viewAllStudentsUrl = 'http://localhost:7000/view-all';
    viewAllStudents (): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.viewAllStudentsUrl, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}