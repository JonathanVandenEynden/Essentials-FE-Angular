import { Component, OnInit } from '@angular/core';
import {AdminDataService} from '../admin-data.service';
import {ActivatedRoute} from '@angular/router';
import {PresetSurvey} from '../../models/presetSurvey.model';

@Component({
  selector: 'app-preset-detail',
  templateUrl: './preset-detail.component.html',
  styleUrls: ['./preset-detail.component.css']
})
export class PresetDetailComponent implements OnInit {
  public presetSurvey: PresetSurvey;
  public answers: string[];
  public nrChosen: number;
  public questionTypes = ['Yes/No', 'Multiple choice', 'Range', 'Open'];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(ps => {
      this.presetSurvey = ps.presetSurvey;
    });
  }


}
