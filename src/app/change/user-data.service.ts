import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Employee} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _USERS$ = new BehaviorSubject<Employee[]>([]);
  private _USERS: Employee[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.users$
      .pipe(
        catchError((err) => {
          this._USERS$.error(err);
          return throwError(err);
        })
      )
      .subscribe((users: Employee[]) => {
        this._USERS = users;
        this._USERS$.next(this._USERS);
      });
  }

  get allUsers$(): Observable<Employee[]> {
    return this._USERS$;
  }

  get users$(): Observable<Employee[]>
  {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchUsers$())
    );
  }
  fetchUsers$(): Observable<Employee[]>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/Employees/GetAllEmployeesFromOrganization`).pipe(catchError(this.handleError), map((list: any[]): Employee[] => list.map(Employee.fromJSON)));
  }

  handleError(err: any): Observable<never>
  {
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
