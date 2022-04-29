export interface IAnswerDTO{
  question_id: string,
  title : string,
  description : string,
  answer_id: string,
  answer: string,
  corectAnswer: boolean,
  corect: boolean,

}

export class AnswerDTO {
  question_id: string;
  title : string;
  description : string;
  answer_id: string;
  answer: string;
  corectAnswer: boolean;
  corect: boolean;
}
