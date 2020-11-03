import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ChangeInitiative} from '../change.model';
import {RoadmapItem} from './roadmapitem.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Survey} from './survey/survey.model';

@Injectable({
  providedIn: 'root'
})
export class RoadmapDataService {

  private _ROADMAPITEMS$ = new BehaviorSubject<RoadmapItem[]>([]);
  private _ROADMAPITEMS: RoadmapItem[];
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
  }

  get roadMapItems$(): Observable<RoadmapItem[]>
  {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchRoadmapItems$())
    );
  }

  fetchRoadmapItems$(): Observable<RoadmapItem[]>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/RoadMapItems/GetRoadMapItemsForChangeInitiative/${2}`).pipe(catchError(this.handleError), tap(console.log), map((list: any[]): RoadmapItem[] => list.map(RoadmapItem.fromJSON)));
  }

  getRoadmapItem$(id: any): Observable<RoadmapItem>
  {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/RoadMapItems/${id}`).pipe(catchError(this.handleError), tap(console.log),  map(RoadmapItem.fromJSON));
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

  addSurveyToRoadmapItem(id: number, survey: Survey): void { // overrides current survey
    // this.http.post(`${environment.apiUrl}/`) // TODO add endpoint for adding survey to rmi
  }
}
