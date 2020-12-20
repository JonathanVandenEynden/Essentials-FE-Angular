export interface QuestionJson{
  id: number;
  type: number;
  questionString: string;
  possibleAnswers: Map<string, number>;
  questionRegistered: {};
}

export class Question {
  private _id: number;
  private _questionRegistered: {};

  constructor(
    private _type: number,
    private _questionString: string,
    private _possibleAnswers: Map<string, number>,
  ) {
  }

  static fromJson(json: QuestionJson): Question {
    if (json != null){
      const q = new Question(
        json.type,
        json.questionString,
        json.possibleAnswers
      );
      q._id = json.id;
      q._questionRegistered = json.questionRegistered;
      return q;
    }
    return null as Question;
  }

  toJson(): QuestionJson {
    return {
      id: this._id,
      type: this._type,
      questionString: this._questionString,
      possibleAnswers: this._possibleAnswers
    } as QuestionJson;
  }

  get Id(): number {
    return this._id;
  }
  get Type(): number {
    return this._type;
  }
  get QuestionString(): string {
    return this._questionString;
  }
  get PossibleAnswers(): Map<string, number> {
    return this._possibleAnswers;
  }
  get QuestionRegistered(): {} {
    return this._questionRegistered;
  }
}
