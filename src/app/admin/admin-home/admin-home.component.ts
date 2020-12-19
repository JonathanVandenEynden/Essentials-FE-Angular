import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminDataService} from '../admin-data.service';
import {Organization} from '../../models/Organization.model';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  private faPlus = faPlus;
  private faSearch = faSearch;
  public filterOrganizationName: string;
  public filterOrganization$ = new Subject<string>();
  public organizations: Organization[] = [];

  constructor(private router: Router, private adminDataService: AdminDataService) {
      this.filterOrganization$
        .pipe(distinctUntilChanged(), map(val => val.toLowerCase()) )
        .subscribe(val => this.filterOrganizationName = val);
  }

  ngOnInit(): void {
    this.getOrganizations();
  }

  NavigateToAddOrganization(): void {
    this.router.navigate(['admin/addOrganization']);
  }

  NavigateToAddAssessment(): void {
    this.router.navigate(['admin/addAssessment']);
  }

  NavigateToOverview(): void {
    this.router.navigate(['admin/overview']);
  }

  getOrganizations(): void {
    this.adminDataService.getOrganizations().subscribe((result) => this.organizations = result);
  }
}
