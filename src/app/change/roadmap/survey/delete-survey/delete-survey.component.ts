import {Component, Input, OnInit} from '@angular/core';
import {Survey} from '../survey.model';

@Component({
  selector: 'app-delete-survey',
  templateUrl: './delete-survey.component.html',
  styleUrls: ['./delete-survey.component.css']
})
export class DeleteSurveyComponent implements OnInit {

  @Input() public survey: Survey;

  constructor() { }

  ngOnInit(): void {
  }
}
