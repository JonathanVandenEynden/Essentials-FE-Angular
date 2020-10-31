import {ClosedQuestion, ClosedQuestionJson} from './ClosedQuestion.model';

export interface SurveyJson{
  id: number;
  questions: ClosedQuestionJson[];
  feedback: ClosedQuestionJson;
  amountSubmitted: number;
}

export class Survey {
  private id: number;
  constructor(
    private questions: ClosedQuestion[],
    private feedback: ClosedQuestion,
    private amountSubmitted: number
  ) {}

  static fromJSON(json: SurveyJson): Survey {
    const assessment = new Survey(
      json.questions.map(ClosedQuestion.fromJson),
      ClosedQuestion.fromJson(json.feedback),
      json.amountSubmitted
    );
    assessment.id = json.id;
    return assessment;
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
  get Questions(): ClosedQuestion[] {
    return this.questions;
  }
  get Feedback(): ClosedQuestion {
    return this.feedback;
  }
}

