import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmployeeCsvRecord} from '../models/EmployeeCsvRecord';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {OrganizationPostJson} from './add-organization/add-organization.component';
import {Organization} from '../models/Organization.model';
import {ChangeInitiative} from '../models/change.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private http: HttpClient) { }

  postOrganization(json: OrganizationPostJson): Observable<any> {
    // TODO remove adminId when backend is ready for authentication
    return this.http.post(`${environment.apiUrl}/Organizations/1`, json).pipe(catchError(this.handleError), tap(console.log));
  }

  getOrganizations(): Observable<Organization[]>{
    // TODO remove adminId when backend is ready for authentication
    return this.http.get(`${environment.apiUrl}/Organizations/GetOrganizationsByAdminId/1`)
      .pipe(catchError(this.handleError), tap(console.log), map((list: any[]): Organization[] => list.map(Organization.fromJSON)));
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
