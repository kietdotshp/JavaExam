import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../service/local-storage.service';
import { IQuestion } from '../expansion-panel/question';
import { AnswerDTO } from './answer';
import { SPINNER_HELPERS } from './helpers.data';

@Component({
  selector: 'cdk-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  answerDTOs : AnswerDTO[];

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
    for( let i = 0 ;i < this.questions.length ;i++ ){

        var question_id = this.questions[i].question_id;
        var title = this.questions[i].title;
        var description = this.questions[i].description;
        var answer_id1: any;
        var answer: any;
        var corect: any;
        for( let j = 0 ; j < this.questions[i].answer.length ;j++ ){
          answer_id1 = this.questions[i].answer[j].id
           answer =  this.questions[i].answer[j].answer
            if(this.questions[i].answer[j].status == true && this.questions[i].answer[j].corectAnswer == true ){
              corect = true;
            }
            else{
              corect = false;
            }
        }
        this.answerDTOs.push( new AnswerDTO(question_id, title, description, answer_id1, answer, corect, corect) );
    }
    console.log(this.answerDTOs);
  }

}
