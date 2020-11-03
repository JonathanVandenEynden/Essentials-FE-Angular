import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../survey.model';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey-button',
  templateUrl: './survey-button.component.html',
  styleUrls: ['./survey-button.component.css']
})
export class SurveyButtonComponent implements OnInit {
  @Input() public survey: Survey;
  faEdit = faEdit;
  faTrash = faTrash;
  constructor() { }

  ngOnInit(): void {
    console.log(this.survey);
    console.log(this.survey.Questions);
  }

  deleteSurvey(): void {
    console.log('deleteSurvey clicked');
  }

  updateSurvey(): void {
    console.log('updateSurvey clicked');
  }
}
