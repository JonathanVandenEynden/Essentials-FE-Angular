import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmployeeCsvRecord} from '../models/EmployeeCsvRecord';
import {Observable, throwError} from 'rxjs';
import {catchError, exhaust, exhaustMap, map, switchAll, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {OrganizationPostJson} from './add-organization/add-organization.component';
import {Organization} from '../models/Organization.model';
import {ChangeInitiative} from '../models/change.model';
import {Employee} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private http: HttpClient) {
  }

  postOrganization(json: OrganizationPostJson): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/Organizations`, json)
      .pipe(catchError(this.handleError), tap(console.log));
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get(`${environment.apiUrl}/Organizations/GetOrganizationsForAdmin`)
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

  // initPost(json: OrganizationPostJson): Observable<any> {
  //   return this._RELOAD$.pipe(
  //     switchMap(() => this.fetchEmployee$(email))
  //   );
  // }
}
