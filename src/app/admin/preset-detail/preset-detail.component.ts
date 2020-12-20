import { Component, OnInit } from '@angular/core';
import {AdminDataService} from '../admin-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PresetSurvey} from '../../models/presetSurvey.model';
import {faPlus, faSearch, faHome, faClipboard} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-preset-detail',
  templateUrl: './preset-detail.component.html',
  styleUrls: ['./preset-detail.component.css']
})
export class PresetDetailComponent implements OnInit {
  public presetSurvey: PresetSurvey;
  public answers: string[];
  public nrChosen: number;
  public questionTypes = ['Yes/No', 'Range', 'Multiplechoice', 'Open'];
  faClipboard = faClipboard;
  faPlus = faPlus;
  faHome = faHome;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(ps => {
      this.presetSurvey = ps.presetSurvey;
    });
  }

  NavigateToHome(): void {
    this.router.navigate(['admin/home']);
  }


  NavigateToPredefinedAssessments(): void {
    this.router.navigate(['admin/overview']);
  }
}
