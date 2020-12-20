import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../../../../models/survey.model';
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
  questionTypes = ['Yes/No', 'Range', 'Multiple choice', 'Open'];


  constructor() { }

  ngOnInit(): void {
  }

  updateSurvey(): void {

  }
}
