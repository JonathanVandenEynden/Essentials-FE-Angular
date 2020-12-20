export interface AnswerJson {
  id: number;
  answerString: string;
  amountChosen: number;
}

export class Answer {
  private id: number;
  constructor(private answerString: string,
              private amountChosen: number) {
  }
  static fromJson(json: AnswerJson): Answer{
    const a = new Answer(
      json.answerString,
      json.amountChosen
    );
    a.id = json.id;
    return a;
  }
  toJson(): AnswerJson{
    return {
      id: this.id,
      answerString: this.answerString,
      amountChosen: this.amountChosen
    } as AnswerJson;
  }

  get Id(): number{
    return this.id;
  }
  get AnswerString(): string{
    return this.answerString;
  }
  get AmountChosen(): number{
    return this.amountChosen;
  }
}
