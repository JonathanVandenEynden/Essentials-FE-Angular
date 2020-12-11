import { Injectable } from '@angular/core';
import {Survey} from '../models/survey.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {RoadmapItem} from '../models/roadmapitem.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Project} from '../models/Project.model';
import {ChangeInitiative} from '../models/change.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardDataService {
  /*region variables*/
  private _PROJECT$ = new BehaviorSubject<Project[]>([]);
  private _PROJECT: Project[];
  private _CHANGEINITIATIVES$ = new BehaviorSubject<ChangeInitiative[]>([]);
  private _CHANGEINITIATIVES: ChangeInitiative[];

  private _RELOAD$ = new BehaviorSubject<boolean>(true);
  /*endregion*/

  constructor(private http: HttpClient) {
    this.projects$
      .pipe(
        catchError((err) => {
          this._PROJECT$.error(err);
          return throwError(err);
        })
      )
      .subscribe((project: Project[]) => {
        this._PROJECT = project;
        this._PROJECT$.next(this._PROJECT);
      });

    this.changeInitiatives$
      .pipe(
        catchError((err) => {
          this._CHANGEINITIATIVES$.error(err);
          return throwError(err);
        })
      )
      .subscribe((changeInitiatives: ChangeInitiative[]) => {
        this._CHANGEINITIATIVES = changeInitiatives;
        this._CHANGEINITIATIVES$.next(this._CHANGEINITIATIVES);
      });
  }

  /*region project*/
  get projects$(): Observable<Project[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchProjects$())
    );
  }
  fetchProjects$(): Observable<Project[]>
  {
    return this.http.get(`${environment.apiUrl}/Dashboard/GetProjectsChangeManager`)
      .pipe(
        catchError(this.handleError),
        map((list: any[]): Project[] => list.map(Project.fromJSON)));
  }
  /*endregion*/

  /*region changeInitiatives*/
  get changeInitiatives$(): Observable<ChangeInitiative[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchChangeInitiatives$())
    );
  }
  fetchChangeInitiatives$(): Observable<ChangeInitiative[]> {
    return this.http
      .get(`${environment.apiUrl}/Dashboard/GetChangeInitiativesForChangeManager`)
      .pipe(
        catchError(this.handleError),
        map((list: any[]): ChangeInitiative[] => list.map(ChangeInitiative.fromJSON))
      );
  }
  /*endregion*/

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    return throwError(errorMessage);
  }
}
