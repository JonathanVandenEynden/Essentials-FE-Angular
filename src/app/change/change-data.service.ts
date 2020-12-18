import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
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
    console.log(params);
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
    return this.http.put(`${environment.apiUrl}/ChangeInitiatives/${change.id}`, change.toJSON()).pipe(catchError(this.handleError), map(ChangeInitiative.fromJSON)).pipe(catchError((err) => throwError(err)), tap((change: ChangeInitiative) => {
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
    console.error(err);
    return throwError(errorMessage);
  }

  sendPushnotification(title: string, message: string,ids: number[]): void{
    const tokens = [];
    // tslint:disable-next-line:max-line-length
    console.log(ids.toString());
    this.http.get(`${environment.apiUrl}/DeviceTokens/GetByIds?userids=${ids.toString()}`).pipe(catchError(this.handleError)).subscribe(e => tokens.push(e));
    console.log(tokens);
    tokens.forEach(t => this.sendNotifications('Essentials - New CI', 'New Change initiative added', t));
  }

  sendNotifications(title: string, message: string, deviceId: string): void{
    console.log('notification send');
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'key=' + 'AAAAjQbE4JE:APA91bG6xmBINuyMRO0CIE6IUYW2wT38l3By12RkIcC17sqEznr2yBgZ035VimzzxPWaKMNopW8MS4yH84F6GpVDaOaJZJkhKFFEabGO_YwOGx2kTA39M7bYz3Nae2lr_NWxdcFWi008'
    });

    const data: FCMData = {
      body: message,
      title
    };
    const fcmPayload: FCMPayload = {
      to: deviceId,
      collapse_key: 'type_a',
      data
    };
    this.http.post('https://fcm.googleapis.com/fcm/send' , fcmPayload , {headers}).subscribe(res => {
      console.log(res);
    });
  }
}

// Interfaces containing payload
export interface FCMData {
  body: string;
  title: string;
}
export interface FCMPayload {
  to: string;
  collapse_key: string;
  data: FCMData;
}

