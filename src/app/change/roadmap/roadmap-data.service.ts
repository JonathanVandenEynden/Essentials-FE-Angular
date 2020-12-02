import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ChangeInitiative} from '../../models/change.model';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Survey, SurveyJson} from '../../models/survey.model';
import {Question} from '../../models/Question.model';
import {PostRmiJson} from './add-roadmap-item/add-roadmap-item.component';

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

  get roadMapItems$(): Observable<RoadmapItem[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchRoadmapItems$())
    );
  }

  // Staat hier voor geen kapotte code te hebben; These are not the codes you're looking for
  fetchRoadmapItems$(): Observable<RoadmapItem[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/RoadMapItems/GetRoadMapItemsForChangeInitiative/${2}`).pipe(catchError(this.handleError), tap(console.log), map((list: any[]): RoadmapItem[] => list.map(RoadmapItem.fromJSON)));
  }

  getRoadmapItem$(id: any): Observable<RoadmapItem> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/RoadMapItems/${id}`).pipe(catchError(this.handleError), tap(console.log), map(RoadmapItem.fromJSON));
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

  // creates empty survey for a RMI and returns the created survey
  addSurveyToRoadmapItem(id: number): Observable<Survey> {
    return this.http.post(`${environment.apiUrl}/Survey?roadmapItemId=${id}`, null)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map((json: any) => Survey.fromJSON(json)
        )
      );
  }

  addRoadmapItemToChangeInitiative(ciId: number, rmiJson: PostRmiJson): Observable<any> {
    return this.http.post(`${environment.apiUrl}/RoadMapItems/${ciId}`, rmiJson).pipe(catchError(this.handleError));
  }

  updateRoadMapItem(rmiId: number, rmiJson: PostRmiJson): Observable<any>  {
    return this.http.put(`${environment.apiUrl}/RoadMapItems/${rmiId}`, rmiJson).pipe(catchError(this.handleError));
  }

  deleteRoadmapItem(rmiId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/RoadMapItems/${rmiId}`).pipe(catchError(this.handleError), tap(console.log));
  }
}
