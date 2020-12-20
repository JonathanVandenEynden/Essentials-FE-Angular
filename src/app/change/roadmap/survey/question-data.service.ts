import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

import {Question} from '../../../models/Question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  constructor(private http: HttpClient) {
  }

  getSurvey$(id: number): Observable<Question> {
    return this.http.get(`${environment.apiUrl}/Question/${id}`)
      .pipe(
        catchError(this.handleError),
        map(Question.fromJson));
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

  addAnswersToQuestion(questionId: number, possibleAnswers: string[]): void {
    this.http.post(`${environment.apiUrl}/Questions/PostAnswerToQuestion/${questionId}?initialize=true`, possibleAnswers)
      .pipe(
        catchError(this.handleError),
      )
      .subscribe();
  }
}
