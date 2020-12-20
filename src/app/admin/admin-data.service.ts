import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, exhaust, exhaustMap, map, switchAll, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {OrganizationPostJson} from './add-organization/add-organization.component';
import {Organization} from '../models/Organization.model';
import {ChangeInitiative} from '../models/change.model';
import {Employee} from '../models/user.model';
import {PresetSurvey} from '../models/presetSurvey.model';
import {Changemanager} from '../models/changemanager.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private http: HttpClient) { }

  postOrganization(json: OrganizationPostJson): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/Organizations`, json)
      .pipe(catchError(this.handleError), tap(console.log));
  }

  postPresetSurvey(json: { theme: string; presetQuestion: { type: number; questionString: string }}): Observable<PresetSurvey>{
    return this.http.post(`${environment.apiUrl}/Preset`, json)
      .pipe(
        catchError(this.handleError),
        tap(console.log),
        map((jsonResponse: any) => PresetSurvey.fromJson(jsonResponse)));
  }

  postAnswerToPresetQuestion(questionId: number, answers: string[]): Observable<any>{
    return this.http.post(`${environment.apiUrl}/Preset/PostAnswerToPresetQuestion/${questionId}`, answers);
  }

  getOrganizations(): Observable<Organization[]>{
    return this.http.get(`${environment.apiUrl}/Organizations/GetOrganizationsForAdmin`)
      .pipe(catchError(this.handleError), tap(console.log), map((list: any[]): Organization[] => list.map(Organization.fromJSON)));
  }

  getOrganization(id: number): Observable<Organization>{
    return this.http.get(`${environment.apiUrl}/Organizations/${id}`)
      .pipe(catchError(this.handleError), tap(console.log), map(Organization.fromJSON));
  }

  getChangeManagersFromOrganization(): Observable<Changemanager>{
    return this.http.get(`${environment.apiUrl}/ChangeManagers/GetChangeManagersFromOrganization`)
      .pipe(catchError(this.handleError), tap(console.log), map(Changemanager.fromJSON));
  }

  getPresetSurveyThemes(): Observable<string[]>{
    return this.http.get(`${environment.apiUrl}/Preset/GetAllThemas`)
      .pipe(catchError(this.handleError), tap(console.log));
  }

  getPresetSurveysByTheme(theme: string): Observable<PresetSurvey>{
    console.log('2');
    return this.http.get(`${environment.apiUrl}/Preset/GetPresetSurveyBy/${theme}`)
      .pipe(catchError(this.handleError),
        tap(console.log),
        map(PresetSurvey.fromJson),
        tap(console.log));
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
