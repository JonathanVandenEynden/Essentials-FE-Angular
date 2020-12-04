import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Employee} from "../models/user.model";

// tslint:disable-next-line:typedef
function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // tslint:disable-next-line:variable-name
  private readonly _tokenKey = 'currentUser';
  // tslint:disable-next-line:variable-name
  private _user$: BehaviorSubject<string>;
  // tslint:disable-next-line:variable-name
  private _loggedInUser$: Observable<Employee>;
  public redirectUrl: string = null;
  private _RELOAD$ = new BehaviorSubject<boolean>(true);
  private errorMessage: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      this._loggedInUser$ = this.getEmployeeByEmail$(parsedToken.unique_name);
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        this._loggedInUser$ = null;
        parsedToken = null;
      }
    }
    // this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name);
  }

  get user$(): Observable<Employee> {
    return this._loggedInUser$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get role(): string {
    const parsedToken = parseJwt(this.token);
    if (parsedToken) {
      console.log(parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      return parsedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(`${environment.apiUrl}/Account/login`, { email, password }, { responseType: 'text' })
      .pipe(map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            // this._user$.next(email);
            this._loggedInUser$ = this.getEmployeeByEmail$(email);
            if (this.errorMessage != null)
            {
              this._loggedInUser$ = this.getChangeManagerByEmail$(email);
            }
            console.log(this._loggedInUser$);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  // tslint:disable-next-line:typedef
  logout() {
    if (localStorage.getItem(this._tokenKey)) {
      localStorage.removeItem(this._tokenKey);
      // this._loggedInUser$.next(null);
    }
  }

  getEmployeeByEmail$(email: string): Observable<Employee>
  {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchEmployee$(email))
    );
  }

  fetchEmployee$(email: string): Observable<Employee>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/Employees/GetEmployeeByEmail/${email}`).pipe(catchError(this.handleError), map(Employee.fromJSON));
  }

  getChangeManagerByEmail$(email: string): Observable<Employee>
  {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchChangeManager$(email))
    );
  }

  fetchChangeManager$(email: string): Observable<Employee>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeManager/GetChangeManagerByEmail/${email}`).pipe(catchError(this.handleError),  map(Employee.fromJSON));
  }

  handleError(err: any): Observable<never>
  {
    if (err instanceof HttpErrorResponse) {
      this.errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      this.errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(this.errorMessage);
  }
}
