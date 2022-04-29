import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../service/local-storage.service';
import { IQuestion } from '../expansion-panel/question';
import { IAnswerDTO } from './answer';
import { SPINNER_HELPERS } from './helpers.data';

@Component({
  selector: 'cdk-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  answerDTOs : IAnswerDTO[];

  public showSource;
  public colors = 'primary';
  public modes = 'determinate';
  public values = 50;

  public color;
  public mode ;
  public value;

  public spinnerHelpers: any = SPINNER_HELPERS;

  // my custom component
  questions : any;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {

    this.showAnswersChoice();

  }
  // showProgressBarCode;

  showAnswersChoice(){
    this.questions = this.localStorageService.getQuestions();
    console.log(this.questions);
    this.questions.forEach(question =>{
      this.answerDTOs['question_id'] = question.id;
      this.answerDTOs['title'] = question.title;
      this.answerDTOs['description'] = question.description;
      question.answer.forEach(answer =>{
        if(answer.status == true){
          this.answerDTOs['answer'].answer.id  = question.answer.id;
          this.answerDTOs['answer'].answer.status  = question.answer.status;
        }
      })
    })
    console.log(this.answerDTOs);
  }

}
