import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ChangeInitiative} from '../models/change.model';
import {ChangeGroup} from '../models/changegroup.model';

export interface ChangeInitiativePostJson {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  sponsor: { email: string; };
  changeType: string;
  changeGroupDto: { name: string; userIds: number[]; };
}

@Injectable({
  providedIn: 'root'
})
export class ChangeDataService {
  private _CHANGES$ = new BehaviorSubject<ChangeInitiative[]>([]);
  private _CHANGES: ChangeInitiative[];
  private _RELOAD$ = new BehaviorSubject<boolean>(true);
  public errorMessage = '';

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

  get changes$(): Observable<ChangeInitiative[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchChanges$())
    );
  }

  getChanges$(group?: string, progress?: string): Observable<ChangeInitiative[]> {
    return this._RELOAD$.pipe(
      switchMap(() => this.fetchChanges$(group, progress))
    );
  }

  fetchChanges$(group?: string, progress?: string): Observable<ChangeInitiative[]> {
    let params = new HttpParams();
    params = group ? params.append('group', group) : params;
    params = progress ? params.append('progress', progress) : params;
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeInitiatives/GetChangeInitiativesForChangeManager`, {params}).pipe(catchError(this.handleError), map((list: any[]): ChangeInitiative[] => list.map(ChangeInitiative.fromJSON)));
  }

  getChangeGroup(): Observable<ChangeGroup[]> {
    // TODO: Niet meer hardcoded maken
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeGroups/GetAllGhangeGroupsOfOrganization/${1}`).pipe(catchError(this.handleError), map((list: any[]): ChangeGroup[] => list.map(ChangeGroup.fromJSON)));
  }

  getChange$(id: any): Observable<ChangeInitiative> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.apiUrl}/ChangeInitiatives/${id}`).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON));
  }

  // tslint:disable-next-line:typedef
  addNewChange(changeJson: ChangeInitiativePostJson) {

    // tslint:disable-next-line:max-line-length
    // TODO 1 weghalen
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${environment.apiUrl}/ChangeInitiatives/1`, changeJson).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON)).subscribe((c: ChangeInitiative) => {
      this._CHANGES = [...this._CHANGES, c];
      this._CHANGES$.next(this._CHANGES);
      this._RELOAD$.next(true);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMessage = `Error while trying to add the new change ${changeJson.name.toString()}`;
        } else {
          this.errorMessage = `Error! something is wrong with the website, please try again later`;
        }
      });
  }

  // tslint:disable-next-line:typedef
  removeChange(id: number) {
    return this.http.delete(`${environment.apiUrl}/ChangeInitiatives/${id}`).pipe(catchError(this.handleError)).subscribe(() => {
      this._RELOAD$.next(true);
    });
  }

  // tslint:disable-next-line:typedef
  updateChange(change: ChangeInitiative) {
    // tslint:disable-next-line:max-line-length no-shadowed-variable
    return this.http.put(`${environment.apiUrl}/ChangeInitiatives/${change.id}`, change.toJSON()).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON)).pipe(catchError((err) => throwError(err)), tap(() => {
      this._RELOAD$.next(true);
    }));
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

  sendPushnotification(title: string, message: string, ids: number[]): void {
    const idparam = ids.toString();
    let params = new HttpParams();
    params = idparam ? params.append('userids', idparam) : params;
    params = title ? params.append('title', title) : params;
    params = message ? params.append('message', message) : params;
    this.http.get(`${environment.apiUrl}/DeviceTokens/sendNotifications`, {params}).pipe(catchError(this.handleError)).subscribe();
  }

}
