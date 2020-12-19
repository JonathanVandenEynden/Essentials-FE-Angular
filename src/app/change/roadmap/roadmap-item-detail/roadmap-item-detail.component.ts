import {Component, OnInit} from '@angular/core';
import {faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {RoadmapItem} from '../../../models/roadmapitem.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SurveyDataService} from '../survey/survey-data.service';
import {DeleteSurveyComponent} from '../survey/delete-survey/delete-survey.component';
import {SurveyChoiceDialogComponent} from '../survey/survey-choice-dialog/survey-choice-dialog.component';

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
    const dialogRef = this.dialog.open(SurveyChoiceDialogComponent, {
      width: '500px',
      data: {
        newSurvey: false,
        roadMapItemId: this.roadmapItem.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['addSurvey/', this.roadmapItem.id]);
      } else {
        window.location.reload();
      }
    });
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
    this.router.navigate(['updateSurvey/', this.roadmapItem.id]);
  }
}
