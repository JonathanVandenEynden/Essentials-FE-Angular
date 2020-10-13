
export interface AssesmentJson{
  Id: number;
}

export class Assesment {
  private ID: number;
  constructor(
  ) {}

  static fromJSON(json: AssesmentJson): Assesment {
    const assesment = new Assesment(
    );
    assesment.ID = json.Id;
    return assesment;
  }

  toJSON(): AssesmentJson {
    // @ts-ignore
    return {
    } as AssesmentJson;
  }
  get id(): number {
    return this.ID;
  }
}

