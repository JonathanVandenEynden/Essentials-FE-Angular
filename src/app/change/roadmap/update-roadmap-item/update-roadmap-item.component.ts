import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RoadmapDataService} from '../roadmap-data.service';
import {Location} from '@angular/common';
import {PostRmiJson} from '../add-roadmap-item/add-roadmap-item.component';
import {RoadmapItem} from '../../../models/roadmapitem.model';

function validateDates(control: FormGroup): { [key: string]: any } {
  if (control.get('endDate').value < control.get('startDate').value) {
    return {endBeforeStart: true};
  }
  return null;
}

@Component({
  selector: 'app-update-roadmap-item',
  templateUrl: './update-roadmap-item.component.html',
  styleUrls: ['./update-roadmap-item.component.css']
})
export class UpdateRoadmapItemComponent implements OnInit {

  public roadmapItem: RoadmapItem;

  public rmiForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private roadmapDataService: RoadmapDataService,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.roadmapItem = item.roadmapItem);
    this.rmiForm = this.fb.group({
      title: [this.roadmapItem.title, Validators.required],
      startDate: [this.roadmapItem.startDateString],
      endDate: [this.roadmapItem.endDateString]
    }, {validator: validateDates});
  }

  onSubmit(): void {
    const rmiJson = {
      title : this.rmiForm.value.title,
      startDate : this.rmiForm.value.startDate,
      endDate : this.rmiForm.value.endDate
    } as PostRmiJson;

    this.roadmapDataService.updateRoadMapItem(this.roadmapItem.id, rmiJson).subscribe(() => {
      this.location.back();
    });
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.dateNotInFuture) {
      return 'The start date should be in the future';
    } else if (errors.endBeforeStart) {
      return 'The end date should be after the start date';
    }
  }

}
