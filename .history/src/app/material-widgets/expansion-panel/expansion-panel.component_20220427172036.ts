import { Component, Injectable, OnInit } from '@angular/core';
import { EXPANSION_HELPERS } from './helpers.data';
import { IQuestion, Question } from './question';
import { QuestionService } from './expansion-panel.service';
import { interval } from 'rxjs';

@Component({
  selector: 'cdk-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  step = 0;
  public basicPanelOpenState: any;
  expansionHelpers = EXPANSION_HELPERS;
  questions: IQuestion[];
  questionPrivew: Question;
  // currentQuestion : number =1;
  questionNo: number = 0;
  couter = 60;
  currentAnswers: any;
  interval$: any;
  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      data.forEach(item => {
        item.answerDTOS.forEach((element)=>{
          Object.assign({"status" : false},...element);
          console.log(element);
        });
      });
      console.log(data);
    });
    this.startCouter();
  }

  openQuestion(index: number) {
    this.questionNo = index;
  }

  nextQuestion() {
    if (this.questionNo == this.questions.length - 1) {
      this.questionNo = this.questions.length - 1;
    } else {
      this.questionNo++;
    }
    console.log(this.questionNo);
  }

  previousQuestion() {
    if (this.questionNo == 0) {
      this.questionNo = 0;
    } else {
      this.questionNo--;
    }
  }
  startCouter() {
    this.interval$ = interval(1000).subscribe((value) => {
      this.couter--;
      if (this.couter === 0) {
        // this.questionNo++;
        this.couter = 60;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 6000000);
  }
  stopCouter() {
    this.interval$.unsubscribe();
    this.couter = 0;
  }
  resetCouter() {
    this.stopCouter();
    this.couter = 60;
    this.startCouter();
  }
  resetQuiz() {
    this.resetCouter();
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      console.log(this.questions);
      this.couter=60
    });
  }

}
