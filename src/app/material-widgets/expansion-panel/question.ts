export interface IQuestion{
  id: string,
  title : string,
  description : string,
  expectedAnswer : string ,
  corectAnswer : string
}

export class Question implements IQuestion{
  id: string;
  title : string;
  description : string;
  expectedAnswer : string ;
  corectAnswer : string ;
}
