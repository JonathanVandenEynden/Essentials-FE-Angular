import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AdminDataService} from '../admin-data.service';
import {PresetSurvey} from '../../models/presetSurvey.model';


@Injectable({
  providedIn: 'root'
})
export class DetailResolver implements Resolve<PresetSurvey> {
  constructor(private adminDataService: AdminDataService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<PresetSurvey> {
    return this.adminDataService.getPresetSurveysByTheme(route.params.theme);
  }
}
