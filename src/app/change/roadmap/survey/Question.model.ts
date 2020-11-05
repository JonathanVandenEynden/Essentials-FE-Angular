import {Answer, AnswerJson} from './Answer.model';

export interface QuestionJson{
  id: number;
  type: number;
  questionString: string;
  possibleAnswers: Map<string, number>;
}

export class Question {
  private id: number;
  constructor(
    private type: number,
    private questionString: string,
    private possibleAnswers: Map<string, number>,
  ) {
  }

  static fromJson(json: QuestionJson): Question {
    const q = new Question(
      json.type,
      json.questionString,
      json.possibleAnswers
    );
    q.id = json.id;
    return q;
  }

  toJson(): QuestionJson {
    return {
      id: this.id,
      type: this.type,
      questionString: this.questionString,
      possibleAnswers: this.possibleAnswers
    } as QuestionJson;
  }

  get Id(): number {
    return this.id;
  }
  get Type(): number {
    return this.type;
  }
  get QuestionString(): string {
    return this.questionString;
  }
  get PossibleAnswers(): Map<string, number> {
    return this.possibleAnswers;
  }
}
