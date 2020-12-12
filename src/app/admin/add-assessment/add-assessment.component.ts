import {Component, OnInit} from '@angular/core';
import {AdminDataService} from '../admin-data.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
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
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {
  public assessmentForm: FormGroup;
  public questionTypes = ['Yes/No', 'Multiple choice', 'Range', 'Open'];

  faPlus = faPlus;
  faMin = faMinus;


  constructor(
    private fb: FormBuilder,
    private adminDataService: AdminDataService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.assessmentForm = this.fb.group({
      theme: ['', [Validators.required, Validators.minLength(2)]],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  onSubmit(): void {
    console.log('submit');
    console.log('start persisting');
    this.persistQuestions();
    console.log('done persisting');
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

  persistQuestions(): void {
    let answers: string[] = [];
    const questionFields: FormArray = this.assessmentForm.controls.questions.value as FormArray;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < questionFields.length; i++) {
      const question = questionFields[i] as QuestionFieldJson;
      // question creation

      const newQuestionJson = {
        type: 0,
        questionString: ''
      };
      newQuestionJson.questionString = question.questionString;

      const newPresetSurveyJson = {
        theme: this.assessmentForm.value.theme,
        presetQuestion: newQuestionJson
      };

      console.log(newQuestionJson.questionString);

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

      // persisting preset survey questions without their answers
      this.adminDataService.postPresetSurvey(newPresetSurveyJson).subscribe( (response) => {
        answers = [];
        if (newQuestionJson.type === 2) {
          question.answers.forEach(a => {
            answers.push(a.answer);
          });
          console.log(answers);
          // TODO persisting of answers of each MC question
          console.log('id');
          console.log(response.PresetQuestion.Id);
          // this.adminDataService.postAnswerToPresetQuestion(response.PresetQuestion.Id, answers).subscribe();
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
