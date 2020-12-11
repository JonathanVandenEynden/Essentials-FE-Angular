import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoadmapItem} from '../../../../models/roadmapitem.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Survey} from '../../../../models/survey.model';
import {RoadmapDataService} from '../../roadmap-data.service';
import {SurveyDataService} from '../survey-data.service';
import {QuestionDataService} from '../question-data.service';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

interface QuestionFieldJson {
  type: string;
  questionString: string;
  answers: AnswerFieldJson[];
}

interface AnswerFieldJson {
  answer: string;
}

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  public roadmapItem: RoadmapItem;
  public  surveyFrom: FormGroup;
  public questionTypes = ['Yes/No', 'Multiple choice', 'Range', 'Open'];
  faPlus = faPlus;
  faMin = faMinus;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roadmapDataService: RoadmapDataService,
    private surveyDataService: SurveyDataService,
    private questionDataService: QuestionDataService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.roadmapItem = item.roadmapItem);
    this.surveyFrom = this.fb.group({
      questions: this.fb.array([this.createQuestion()])
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      questionString: ['', Validators.required],
      answers: this.fb.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['']
    });
  }

  onSubmit(): void {
    // survey aanmaken voor dit RMI
    this.roadmapDataService
      .addSurveyToRoadmapItem(this.roadmapItem.id)
      .subscribe((response) => {
        this.persistQuestions(response);
        this.location.back(); // TODO zou moeten wachten tot persistQuestions gedaan is, maar werkt nog niet (ook niet met observables)
      });
  }

  persistQuestions(newSurveyObj: Survey): void {
    const questionFields: FormArray = this.surveyFrom.controls.questions.value as FormArray;
    // console.log(questionFields);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < questionFields.length; i++) {
      const question = questionFields[i] as QuestionFieldJson;
      // question aanmaken
      const newQuestionJson = {
        type: 0,
        questionString: ''
      };
      newQuestionJson.questionString = question.questionString;

      switch (question.type) {
        case 'Yes/No': {
          newQuestionJson.type = 0;
          break;
        }
        case 'Range': {
          newQuestionJson.type = 1;
          break;
        }
        case 'Multiple choice': {
          newQuestionJson.type = 2;
          break;
        }
        default: {
          newQuestionJson.type = 3;
          break;
        }
      }
      // question persisteren
      this.surveyDataService.addQuestionToSurvey(newSurveyObj.Id, newQuestionJson).subscribe((response) => {
        // eventueel answers toevoegen
        if (response.Type === 2) {
          const answerStrings: string[] = [];
          question.answers.forEach(a => {
            answerStrings.push(a.answer);
          });
          // console.log('HEEEEEJOOOOOO');
          // console.log(answerStrings);
          this.questionDataService.addAnswersToQuestion(response.Id, answerStrings);
        }
      });
    }
  }

  getErrorMessage(errors: any): any {
    if (errors.required) {
      return 'is required';
    }
  }

  getQuestions(form): any {
    return form.controls.questions.controls;
  }

  getAnswers(question): any {
    return question.controls.answers.controls;
  }

  addQuestion(form): void {
    form.controls.questions.push(this.createQuestion());
  }

  addAnswer(question): void {
    question.controls.answers.push(this.createAnswer());
  }

  removeQuestion(form, i): void {
    form.controls.questions.removeAt(i);
  }

  removeAnswer(question, i): void {
    question.controls.answers.removeAt(i);
  }
}
