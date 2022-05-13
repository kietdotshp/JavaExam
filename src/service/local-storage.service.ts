import { Injectable } from '@angular/core';
import { User } from '../app/forms/template-driven-forms/user';
import { IQuestion } from '../app/material-widgets/expansion-panel/question';
import { IUser } from './users';

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

  setUser(user: IUser){
    localStorage.setItem('user', JSON.stringify(user) )
  }

  getUser(){
    const userJson =  localStorage.getItem('user');
   return JSON.parse(userJson);
  }

  remove(item: string){
    localStorage.removeItem(item);
  }


}
