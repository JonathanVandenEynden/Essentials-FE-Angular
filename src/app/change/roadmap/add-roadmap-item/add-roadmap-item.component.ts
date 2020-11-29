import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoadmapDataService} from '../roadmap-data.service';
import {ChangeInitiative} from '../../../models/change.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {QuestionDataService} from '../survey/question-data.service';
import {Location} from '@angular/common';

export interface PostRmiJson {
  title: string;
  startDate: Date;
  endDate: Date;
}

function validateDates(control: FormGroup): { [key: string]: any } {
  if (control.get('endDate').value < control.get('startDate').value) {
    return {endBeforeStart: true};
  }
  return null;
}

function validateStartDate(control: FormControl): { [key: string]: any } {
  const now = new Date(Date.now());
  if (control.value < now.toISOString().split('T')[0]) {
    return {dateNotInFuture: true};
  }
  return null;
}

@Component({
  selector: 'app-add-roadmap-item',
  templateUrl: './add-roadmap-item.component.html',
  styleUrls: ['./add-roadmap-item.component.css']
})
export class AddRoadmapItemComponent implements OnInit {
  public change: ChangeInitiative;

  public rmiForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private roadmapDataService: RoadmapDataService,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
    this.rmiForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', validateStartDate],
      endDate: ['']
    }, {validator: validateDates});
  }

  onSubmit(): void {
    const rmiJson = {
      title : this.rmiForm.value.title,
      startDate : this.rmiForm.value.startDate,
      endDate : this.rmiForm.value.endDate
    } as PostRmiJson;

    this.roadmapDataService.addRoadmapItemToChangeInitiative(this.change.id, rmiJson).subscribe(() => {
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
