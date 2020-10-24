
export interface SurveyJson{
  id: number;
}

export class Survey {
  private ID: number;
  constructor(
  ) {}

  static fromJSON(json: SurveyJson): Survey {
    const assesment = new Survey(
    );
    assesment.ID = json.id;
    return assesment;
  }

  toJSON(): SurveyJson {
    // @ts-ignore
    return {
    } as SurveyJson;
  }
  get id(): number {
    return this.ID;
  }
}

