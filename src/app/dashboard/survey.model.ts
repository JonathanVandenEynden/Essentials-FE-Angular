import {Question, QuestionJson} from './question.model';

export interface SurveyJson{
  id: number;
  questions: QuestionJson[];
  feedback: string;
}

export class Survey {
  private _id: number;

  constructor(private _questions: Question[], private _feedback: string) {}

  static fromJSON(json: SurveyJson): Survey {
    const assessment = new Survey(json.questions.map(Question.fromJSON), json.feedback);
    assessment._id = json.id;
    return assessment;
  }

  toJSON(): SurveyJson {
    return {
      id: this.id,
      questions: this.questions.map(q => q.toJSON()),
      feedback: this.feedback
    } as SurveyJson;
  }

  get id(): number {
    return this._id;
  }
  get questions(): Question[] {
    return this._questions;
  }
  get feedback(): string {
    return this._feedback;
  }
}
