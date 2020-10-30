// TODO Answer verder uitwerken
export class Answer {
  static fromJson(json: any): Answer{
    return new Answer();
  }
  toJson(): any{
    return {};
  }
}

export interface AnswerJson {
  id: number;
}
// TODO END

export interface ClosedQuestionJson{
  id: number;
  questionString: string;
  possibleAnswers: AnswerJson[];
  maxAmount: number;
}

export class ClosedQuestion {
  private id: number;
  constructor(
    private questionString: string,
    private possibleAnswers: Answer[],
    private maxAmount: number
  ) {
  }

  static fromJson(json: ClosedQuestionJson): ClosedQuestion {
    const q = new ClosedQuestion(
      json.questionString,
      json.possibleAnswers.map(Answer.fromJson),
      json.maxAmount
    );
    q.id = json.id;
    return q;
  }

  toJson(): ClosedQuestionJson {
    return {
      id: this.id,
      questionString: this.questionString,
      possibleAnswers: this.possibleAnswers.map(a => a.toJson()),
      maxAmount: this.maxAmount
    } as ClosedQuestionJson;
  }

  get Id(): number {
    return this.id;
  }
  get QuestionString(): string {
    return this.questionString;
  }
  get PossibleAnswers(): Answer[] {
    return this.possibleAnswers;
  }
  get MaxAmount(): number {
    return this.maxAmount;
  }

}
