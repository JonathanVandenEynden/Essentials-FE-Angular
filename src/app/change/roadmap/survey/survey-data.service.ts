import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Survey} from '../../../models/survey.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Question} from '../../../models/Question.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyDataService {
  private _RELOAD$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    // this.surveys$
    //   .pipe(
    //     catchError((err) => {
    //       this._SURVEYS$.error(err);
    //       return throwError(err);
    //     })
    //   )
    //   .subscribe((surveys: Survey[]) => {
    //     this._SURVEYS = surveys;
    //     this._SURVEYS$.next(this._SURVEYS);
    //   });
  }
  getSurvey$(id: number): Observable<Survey> {
    return this.http.get(`${environment.apiUrl}/Surveys/${id}`).pipe(catchError(this.handleError), tap(console.log), map(Survey.fromJSON));
  }

  // get surveys$(): Observable<Survey[]> {
  //   return this._RELOAD$.pipe(
  //     switchMap(() => this.fetchSurveys$())
  //   );
  // }

  // fetchSurveys$(): Observable<Survey[]>
  // {
  //   // tslint:disable-next-line:max-line-length
  //   return this.http.get(`${environment.apiUrl}/Surveys`)
  //       .pipe(
  //         catchError(this.handleError),
  //         tap(console.log),
  //         map((list: any[]): Survey[] => list.map(Survey.fromJSON)));
  // }

  handleError(err: any): Observable<never>
  {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `The server is currently unavailable. Try again later. Error: '${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  // tslint:disable-next-line:typedef
  removeSurvey(roadmapItemId: number) {
    return this.http.delete(`${environment.apiUrl}/Survey/${roadmapItemId}`).pipe(catchError(this.handleError)).subscribe(() => {
      this._RELOAD$.next(true);
    });
  }

  addQuestionToSurvey(surveyId: number, json: { questionString: string; type: number; }): Observable<Question> {
    return this.http.post(`${environment.apiUrl}/Questions/${surveyId}`, json)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map((jsonResponse: any) => Question.fromJson(jsonResponse)
        )
      );
  }

  getPresetSurveyThemes(): Observable<string[]>{
    return this.http.get(`${environment.apiUrl}/Preset/GetAllThemas`)
      .pipe(catchError(this.handleError), tap(console.log));
  }

  addPredefinedSurveyToRmi(id: number, theme: string): Observable<Survey> {
    return this.http.post(`${environment.apiUrl}/Survey?roadmapItemId=${id}&thema=${theme}`, null)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map((json: any) => Survey.fromJSON(json)
        )
      );
  }

}
