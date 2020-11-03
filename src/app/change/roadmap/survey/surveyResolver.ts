import {Injectable} from '@angular/core';
import {Survey} from './survey.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SurveyDataService} from './survey-data.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyResolver implements Resolve<Survey> {
  constructor(private surveyDataService: SurveyDataService) {
  }
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
    return this.surveyDataService.getSurvey$(route.params.id);
  }
}
