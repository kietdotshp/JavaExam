import { Component, Injectable, OnInit } from '@angular/core';
import { EXPANSION_HELPERS } from './helpers.data';
import { IQuestion, Question } from './question';
import {QuestionService} from './expansion-panel.service';

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

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      this.questionPrivew = data[0];

      console.log(this.questions);
      console.log(this.questionPrivew.answerDTOS);
    });
  }

  openQuestion(questionNo: number) {
    this.questionNo = questionNo;

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
}
