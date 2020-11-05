import { Injectable } from '@angular/core';
import {Survey} from './survey.model';
import { SURVEY } from './mock-surveys';
import {Roadmapitem} from './roadmapitem.model';
import {ROADMAPITEM} from './mock-roadmap';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {RoadmapItem} from '../change/roadmap/roadmapitem.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DashboardDataService {
  //mock
  private _surveys = SURVEY;
  private _roadmapitem = ROADMAPITEM;

  get roadmapitem(): Roadmapitem[]{
    return this._roadmapitem;
  }

  get survey(): Survey[] {
    return this._surveys;
  }

  //API
  private _ROADMAPITEMS$ = new BehaviorSubject<RoadmapItem[]>([]);
  private _ROADMAPITEMS: RoadmapItem[];
  private _SURVEYS$ = new BehaviorSubject<Survey[]>([]);
  private _SURVEYS: Survey[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.roadMapItems$
      .pipe(
        catchError((err) => {
          this._ROADMAPITEMS$.error(err);
          return throwError(err);
        })
      )
      .subscribe((roadmapItems: RoadmapItem[]) => {
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
  }

  getSurvey$(id: number): Observable<Survey> {
    return this.http.get(`${environment.apiUrl}/Surveys/${id}`).pipe(catchError(this.handleError), tap(console.log), map(Survey.fromJSON));
  }

  get surveys$(): Observable<Survey[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchSurveys$())
    );
  }

  fetchSurveys$(): Observable<Survey[]>
  {
    return this.http.get(`${environment.apiUrl}/Surveys`)
        .pipe(
          catchError(this.handleError),
          tap(console.log),
          map((list: any[]): Survey[] => list.map(Survey.fromJSON)));
  }

  get roadMapItems$(): Observable<RoadmapItem[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchRoadmapItems$())
    );
  }

  fetchRoadmapItems$(): Observable<RoadmapItem[]> {
    return this.http
      .get(`${environment.apiUrl}/RoadMapItems/GetRoadMapItemsForChangeInitiative/${2}`)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map((list: any[]): RoadmapItem[] => list.map(RoadmapItem.fromJSON))
      );
  }

  getRoadmapItem$(id: any): Observable<RoadmapItem> {
    return this.http
      .get(`${environment.apiUrl}/RoadMapItems/${id}`)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map(RoadmapItem.fromJSON)
      );
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
