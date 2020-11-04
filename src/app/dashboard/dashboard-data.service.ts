import { Injectable } from '@angular/core';
import {Survey} from './survey.model';
import { SURVEY } from './mock-surveys';
import {Roadmapitem} from './roadmapitem.model';
import {ROADMAPITEM} from './mock-roadmap';


@Injectable({
  providedIn: 'root'
})

export class DashboardDataService {
  private _surveys = SURVEY;
  private _roadmapitem = ROADMAPITEM;

  constructor() {}

  get roadmapitem(): Roadmapitem[]{
    return this._roadmapitem;
  }

  get survey(): Survey[] {
    return this._surveys;
  }

}
