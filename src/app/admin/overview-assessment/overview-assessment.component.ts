import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faMinus, faPlus, faHome, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {AdminDataService} from '../admin-data.service';
import {Organization} from '../../models/Organization.model';


@Component({
  selector: 'app-overview-assessment',
  templateUrl: './overview-assessment.component.html',
  styleUrls: ['./overview-assessment.component.css']
})
export class OverviewAssessmentComponent implements OnInit {
  public themes: string[] = [];
  faHome = faHome;
  faPlus = faPlus;

  constructor(private router: Router, private adminDataService: AdminDataService) { }

  ngOnInit(): void {
    this.getThemes();
  }

  NavigateToAddOrganization(): void {
    this.router.navigate(['admin/addAssessment']);
  }

  NavigateToHome(): void {
    this.router.navigate(['admin/home']);
  }

  getThemes(): void {
    this.adminDataService.getPresetSurveyThemes().subscribe((result) => this.themes = result);
  }
}
