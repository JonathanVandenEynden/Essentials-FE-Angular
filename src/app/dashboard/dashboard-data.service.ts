import { Injectable } from '@angular/core';
import {Survey} from '../models/survey.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {RoadmapItem} from '../models/roadmapitem.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Project} from '../models/Project.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardDataService {
  private _ROADMAPITEMS$ = new BehaviorSubject<RoadmapItem[]>([]);
  private _ROADMAPITEMS: RoadmapItem[];
  private _SURVEYS$ = new BehaviorSubject<Survey[]>([]);
  private _SURVEYS: Survey[];
  private _PROJECT$ = new BehaviorSubject<Project[]>([]);
  private _PROJECT: Project[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.roadMapItems$.pipe(
        catchError((err) => {
          this._ROADMAPITEMS$.error(err);
          return throwError(err);
        })
      ).subscribe((roadmapItems: RoadmapItem[]) => {
        this._ROADMAPITEMS = roadmapItems;
        this._ROADMAPITEMS$.next(this._ROADMAPITEMS);
      });

    this.surveys$
      .pipe(
        catchError((err) => {
          this._SURVEYS$.error(err);
          return throwError(err);
        })
      )
      .subscribe((surveys: Survey[]) => {
        this._SURVEYS = surveys;
        this._SURVEYS$.next(this._SURVEYS);
      });

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
  }

  getSurvey$(id: number): Observable<Survey> {
    return this.http.get(`${environment.apiUrl}/Surveys/${id}`).pipe(
      catchError(this.handleError),
      map(Survey.fromJSON)
    );
  }

  get surveys$(): Observable<Survey[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchSurveys$())
    );
  }

  fetchSurveys$(): Observable<Survey[]>
  {
    return this.http.get(`${environment.apiUrl}/Survey`)
        .pipe(
          catchError(this.handleError),
          map((list: any[]): Survey[] => list.map(Survey.fromJSON))
        );
  }
  // TODO: Niet meer hardcoded maken
  get roadMapItems$(): Observable<RoadmapItem[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchRoadmapItems$(1))
    );
  }

  fetchRoadmapItems$(id: any): Observable<RoadmapItem[]> {
    return this.http
      .get(`${environment.apiUrl}/RoadMapItems/GetRoadMapItemsForChangeInitiative/${id}`)
      .pipe(
        catchError(this.handleError),
        map((list: any[]): RoadmapItem[] => list.map(RoadmapItem.fromJSON))
      );
  }

  getRoadmapItem$(id: any): Observable<RoadmapItem> {
    return this.http
      .get(`${environment.apiUrl}/RoadMapItems/${id}`)
      .pipe(
        catchError(this.handleError),
        map(RoadmapItem.fromJSON)
      );
  }

  getProject$(id: number): Observable<Project> {
    return this.http.get(`${environment.apiUrl}/Dashboard/GetProjects/${id}`).pipe(
      catchError(this.handleError),
      map(Project.fromJSON)
    );
  }

  get projects$(): Observable<Project[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchProjects$())
    );
  }

  fetchProjects$(): Observable<Project[]>
  {
    return this.http.get(`${environment.apiUrl}/Dashboard`)
      .pipe(
        catchError(this.handleError),
        map((list: any[]): Project[] => list.map(Project.fromJSON)));
  }

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
