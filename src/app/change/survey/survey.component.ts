import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChangeInitiative} from '../change.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  public change: ChangeInitiative;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
  }

}
