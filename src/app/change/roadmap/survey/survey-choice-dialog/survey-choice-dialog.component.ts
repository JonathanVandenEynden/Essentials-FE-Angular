import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SurveyDataService} from '../survey-data.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-survey-choice-dialog',
  templateUrl: './survey-choice-dialog.component.html',
  styleUrls: ['./survey-choice-dialog.component.css']
})
export class SurveyChoiceDialogComponent implements OnInit {
  themes: string[];
  themeForm: FormGroup;
  roadMapItemId: number;

  constructor(private fb: FormBuilder,
              private surveyDataService: SurveyDataService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.roadMapItemId = data.roadMapItemId;
  }

  ngOnInit(): void {
    this.surveyDataService.getPresetSurveyThemes().subscribe((val) => this.themes = val);

    this.themeForm = this.fb.group({
      theme: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.surveyDataService.addPredefinedSurveyToRmi(this.roadMapItemId, this.themeForm.controls.theme.value).subscribe((survey) => {
      if (survey !== null){

      }
    });
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    }
  }

}
