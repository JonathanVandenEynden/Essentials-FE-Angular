import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrganizationPart} from '../../change/OrganizationPart.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  NavigateToAddOrganization(): void {
    this.router.navigate(['admin/addOrganization']);
  }

  getOrganizations(): void {

  }
}
