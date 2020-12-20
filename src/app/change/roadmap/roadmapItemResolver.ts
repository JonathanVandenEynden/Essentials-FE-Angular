import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {RoadmapDataService} from './roadmap-data.service';


@Injectable({
  providedIn: 'root'
})
export class RoadmapItemResolver implements Resolve<RoadmapItem> {
  constructor(private roadmapDataService: RoadmapDataService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<RoadmapItem> {
    return this.roadmapDataService.getRoadmapItem$(route.params.id);
  }
}
