import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Survey} from './survey.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {any} from 'codelyzer/util/function';
import {ChangeInitiative} from '../../change.model';
import {Question, QuestionJson} from './Question.model';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {
  private _QUESTIONS$ = new BehaviorSubject<Question[]>([]);
  private _QUESTIONS: Question[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.questions$
      .pipe(
        catchError((err) => {
          this._QUESTIONS$.error(err);
          return throwError(err);
        })
      )
      .subscribe((questions: Question[]) => {
        this._QUESTIONS = questions;
        this._QUESTIONS$.next(this._QUESTIONS);
      });
  }

  getSurvey$(id: number): Observable<Question> {
    return this.http.get(`${environment.apiUrl}/Question/${id}`)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map(Question.fromJson));
  }

  get questions$(): Observable<Question[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchQuestions())
    );
  }

  fetchQuestions(): Observable<Question[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/Questions`).pipe(catchError(this.handleError), tap(console.log), map((list: any[]): Question[] => list.map(Question.fromJson)));
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

  addAnswersToQuestion(questionId: number, answers: string[]): void {
    this.http.post(`${environment.apiUrl}/Question/${questionId}`, answers)
      .pipe(
        catchError(this.handleError),
        tap(console.log)
      );
  }
}
