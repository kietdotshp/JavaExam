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
    for( let i =0 ;i < this.questions.length ;i++ ){
        var answerDTO : IAnswerDTO;
        answerDTO.question_id = this.questions[i].question_id;
        answerDTO.title = this.questions[i].title;
        answerDTO.description = this.questions[i].description;
        for( let j = 0 ; j < this.questions[i].answer.length ;j++ ){
          answerDTO.answer_id = this.questions[i].answer[j].id
          answerDTO.answer =  this.questions[i].answer[j].answer
            if(this.questions[i].answer[j].status == true && this.questions[i].answer[j].corectAnswer == true ){
              answerDTO.corect = true;
            }
            else{
              answerDTO.corect = false;
            }
        }
        this.answerDTOs.push(answerDTO);
    }
    console.log(this.answerDTOs);
  }

}
