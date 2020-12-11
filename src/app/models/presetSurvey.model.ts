import {Question, QuestionJson} from './Question.model';

export interface PresetSurveyJson{
  theme: string;
  presetQuestion: QuestionJson;
}

export class PresetSurvey{
  constructor(
    private theme: string,
    private presetQuestion: Question
  ) {
  }

  static fromJson(json: PresetSurveyJson): PresetSurvey {
    if (json != null){
      const ps = new PresetSurvey(
        json.theme,
        Question.fromJson(json.presetQuestion)
      );
      return ps;
    }
    return null as PresetSurvey;
  }

  toJson(): PresetSurveyJson {
    return {
      theme: this.theme,
      presetQuestion: this.presetQuestion.toJson()
    } as PresetSurveyJson;
  }

  get Theme(): string {
    return this.theme;
  }

  get PresetQuestion(): Question {
    return this.presetQuestion;
  }
}
