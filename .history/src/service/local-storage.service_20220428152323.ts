import { Injectable } from '@angular/core';
import { IQuestion } from '../app/material-widgets/expansion-panel/question';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setQuestions(questions: IQuestion[]) {
    localStorage.setItem('questions', JSON.stringify(questions) )
  }

  getQuestions(): IQuestion[] {
   const questionsJson =  localStorage.getItem('questions');
   return JSON.parse(questionsJson);
  }


}
