import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AdminDataService} from '../admin-data.service';
import {Organization} from '../../models/Organization.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationResolver implements Resolve<Organization> {
  constructor(private adminDataService: AdminDataService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Organization> {
    return this.adminDataService.getOrganization(route.params.id);
  }
}
