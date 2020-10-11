import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ChangeInitiative} from './change.model';
import {Changemanager} from './changemanager.model';
import mockChange from './mockChange.json';

@Injectable({
  providedIn: 'root'
})
export class ChangeResolver implements Resolve<ChangeInitiative> {
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);
  constructor() {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): ChangeInitiative {
    return this.changeManager.CHANGEINITIATIVES.find(e => e.id === route.params.id);
  }
}
