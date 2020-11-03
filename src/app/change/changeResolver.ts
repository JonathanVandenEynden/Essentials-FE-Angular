import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {ChangeInitiative} from './change.model';
import {ChangeDataService} from './change-data.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangeResolver implements Resolve<ChangeInitiative> {
  constructor(private changeDataService: ChangeDataService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ChangeInitiative> {
    return this.changeDataService.getChange$(route.params.id);
  }
}
