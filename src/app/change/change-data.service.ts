import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ChangeInitiative} from './change.model';

@Injectable({
  providedIn: 'root'
})
export class ChangeDataService {
  private _CHANGES$ = new BehaviorSubject<ChangeInitiative[]>([]);
  private _CHANGES: ChangeInitiative[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line:typedef
  getChange(changeId: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {
    this.changes$
      .pipe(
        catchError((err) => {
          this._CHANGES$.error(err);
          return throwError(err);
        })
      )
      .subscribe((changes: ChangeInitiative[]) => {
        this._CHANGES = changes;
        this._CHANGES$.next(this._CHANGES);
      });
  }

  get allChanges$(): Observable<ChangeInitiative[]> {
    return this._CHANGES$;
  }

  get changes$(): Observable<ChangeInitiative[]>
  {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchChanges$())
    );
  }

  fetchChanges$(): Observable<ChangeInitiative[]>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeInitiatives/`).pipe(catchError(this.handleError), map((list: any[]): ChangeInitiative[] => list.map(ChangeInitiative.fromJSON)));
  }
  getChange$(id: any): Observable<ChangeInitiative>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeInitiatives/${id}`).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON));
  }
  // tslint:disable-next-line:typedef
  addNewCategory(change: ChangeInitiative)
  {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${environment.apiUrl}/ChangeInitiatives/`, change.toJSON()).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON)).subscribe((c: ChangeInitiative) => {
      this._CHANGES = [...this._CHANGES, c];
      this._CHANGES$.next(this._CHANGES);
      this._RELOAD$.next(true);
    });
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
