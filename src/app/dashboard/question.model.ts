export interface QuestionJson{
  id: number;
  questionString: string;
  possibleAnswers: {};
}

export class Question {
  private _id: number;

  constructor(private _questionString: string, private _possibleAnswers: {}) {}

  static fromJSON(json: QuestionJson): Question {
    const q = new Question(json.questionString, json.possibleAnswers);
    q._id = json.id;
    return q;
  }

  toJSON(): QuestionJson {
    return {
      id: this.id,
      questionString: this.questionString,
      possibleAnswers: this.answers
    } as QuestionJson;
  }

  get id(): number {
    return this._id;
  }
  get questionString(): string {
    return this._questionString;
  }
  get answers(): {} {
    return this._possibleAnswers;
  }

}
