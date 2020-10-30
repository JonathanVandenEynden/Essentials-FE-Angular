import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoadmapItem} from '../../roadmapitem.model';

@Component({
  selector: 'app-survey-button',
  templateUrl: './survey-button.component.html',
  styleUrls: ['./survey-button.component.css']
})
export class SurveyButtonComponent implements OnInit {
  @Input() public roadmap: RoadmapItem;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSurveyDetail(): void {
    // this.router.navigate(['surveydetail/', ]);
  }

}
