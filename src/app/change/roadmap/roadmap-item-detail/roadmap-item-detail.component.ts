import {Component, OnInit} from '@angular/core';
import {faClipboard, faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {RoadmapItem} from '../roadmapitem.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteChangeComponent} from '../../delete-change/delete-change.component';
import {MatDialog} from '@angular/material/dialog';
import {SurveyDataService} from '../survey/survey-data.service';
import {DeleteSurveyComponent} from '../survey/delete-survey/delete-survey.component';

@Component({
  selector: 'app-roadmap-item-detail',
  templateUrl: './roadmap-item-detail.component.html',
  styleUrls: ['./roadmap-item-detail.component.css']
})
export class RoadmapItemDetailComponent implements OnInit {
  public roadmapItem: RoadmapItem;
  faTrash = faTrash;
  faEdit = faPen;
  faAdd = faPlus;
  delete: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              public surveyDataService: SurveyDataService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.roadmapItem = item.roadmapItem);
    console.log(this.roadmapItem);
  }

  addSurvey(): void {

  }

  deleteSurveyFromRoadmapItem(): void {

    const dialogRef = this.dialog.open(DeleteSurveyComponent, {
      width: '500px',
      data: {delete: this.delete}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.delete = result;
      if (this.delete) {
        this.surveyDataService.removeSurvey(this.roadmapItem.id);
        this.roadmapItem.survey = null;
      }
    });

  }

  updateSurvey(): void {

  }
}
