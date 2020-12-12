export interface QuestionJson {
  id: number;
  type: number;
  questionString: string;
  possibleAnswers: Map<string, number>;
}

export class Question {
  id: number;

  constructor(
    private type: number,
    private questionString: string,
    private possibleAnswers: Map<string, number>,
  ) {
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

  static fromJson(json: QuestionJson): Question {
    if (json != null) {
      const q = new Question(
        json.type,
        json.questionString,
        json.possibleAnswers
      );
      q.id = json.id;
      return q;
    }
    return null as Question;
  }

  toJson(): QuestionJson {
    return {
      id: this.id,
      type: this.type,
      questionString: this.questionString,
      possibleAnswers: this.possibleAnswers
    } as QuestionJson;
  }
}
