import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoadmapItem} from '../../roadmapitem.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Survey} from '../survey.model';
import {Question} from '../ClosedQuestion.model';
import {map} from 'rxjs/operators';
import {RoadmapDataService} from '../../roadmap-data.service';

interface QuestionFieldJson {
  type: string;
  question: string;
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
  public surveyFrom: FormGroup;
  public questionTypes = ['Yes/No', 'multiple choice', 'Range'];
  faPlus = faPlus;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private roadmapDataService: RoadmapDataService) {
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
      question: ['', Validators.required],
      answers: this.fb.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const questionObjecten: Question[] = [];

    const questionFields: FormArray = this.surveyFrom.controls.questions.value as FormArray;
    // console.log(questionFields);
    for (let i = 0; i <= questionFields.length; i++) {
      const question = questionFields[i] as QuestionFieldJson;
      if (question === undefined) {
        continue;
      }
      const answerMap = new Map<string, number>();
      question.answers.forEach(a => {
        answerMap.set(a.answer, 0);
      });
      questionObjecten.push(new Question(question.type, question.question, answerMap));

      // console.log(questionObjecten);
    }

    // Default feedback question
    const fbAnswers = new Map<string, number>();
    fbAnswers.set('Good', 0);
    fbAnswers.set('Okay', 0);
    fbAnswers.set('Bad', 0);
    const defaultFeedback: Question = new Question('multiple choice',
      'How do you feel with the current change?', fbAnswers
    );
    const survey: Survey = new Survey(questionObjecten, defaultFeedback, 0);

    this.roadmapDataService.addSurveyToRoadmapItem(this.roadmapItem.id, survey);

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
}
