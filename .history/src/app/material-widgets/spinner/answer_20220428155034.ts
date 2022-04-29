export interface IAnswerDTO{
  question_id: string,
  title : string,
  description : string,
  answer:{
    id: string,
    answer: string,
    corectAnswer: boolean,
    status: boolean,
  }
}
