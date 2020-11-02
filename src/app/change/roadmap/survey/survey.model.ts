import {Question, QuestionJson} from './ClosedQuestion.model';

export interface SurveyJson{
  id: number;
  questions: QuestionJson[];
  feedback: QuestionJson;
  amountSubmitted: number;
}

export class Survey {
  private id: number;
  constructor(
    private questions: Question[],
    private feedback: Question,
    private amountSubmitted: number
  ) {}

  static fromJSON(json: SurveyJson): Survey {
    if (json != null){
      const survey = new Survey(
        json.questions.map(Question.fromJson),
        Question.fromJson(json.feedback),
        json.amountSubmitted
      );
      survey.id = json.id;
      return survey;
    }
    return null as Survey;
  }

  toJSON(): SurveyJson {
    return {
      id: this.id,
      questions: this.questions.map(q => q.toJson()),
      feedback: this.feedback.toJson(),
      amountSubmitted: this.amountSubmitted
    } as SurveyJson;
  }
  get Id(): number {
    return this.id;
  }
  get Questions(): Question[] {
    return this.questions;
  }
  get Feedback(): Question {
    return this.feedback;
  }
}

