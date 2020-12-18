import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminDataService} from '../admin-data.service';
import {Organization} from '../../models/Organization.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public organizations: Organization[] = [];
  constructor(private router: Router, private adminDataService: AdminDataService) { }

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
