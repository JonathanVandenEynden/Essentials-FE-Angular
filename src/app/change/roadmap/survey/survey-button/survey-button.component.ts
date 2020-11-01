import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../survey.model';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {DeleteChangeComponent} from '../../../delete-change/delete-change.component';
import {MatDialog} from '@angular/material/dialog';
import {SurveyDataService} from '../survey-data.service';

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
  }

  updateSurvey(): void {

  }
}
