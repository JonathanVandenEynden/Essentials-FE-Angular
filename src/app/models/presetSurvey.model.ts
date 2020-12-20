import {Question, QuestionJson} from './Question.model';

export interface PresetSurveyJson {
  theme: string;
  presetQuestions: QuestionJson[];
}

export class PresetSurvey {
  constructor(
    private theme: string,
    private presetQuestions: Question[]
  ) {
  }

  get Theme(): string {
    return this.theme;
  }

  get PresetQuestions(): Question[] {
    return this.presetQuestions;
  }

  static fromJson(json: PresetSurveyJson): PresetSurvey {
    if (json != null) {
      const ps = new PresetSurvey(
        json.theme,
        json.presetQuestions.map(Question.fromJson)
      );
      return ps;
    }
    return null as PresetSurvey;
  }

  toJson(): PresetSurveyJson {
    return {
      theme: this.theme,
      presetQuestions: this.presetQuestions.map(elem => elem.toJson())
    } as PresetSurveyJson;
  }
}
