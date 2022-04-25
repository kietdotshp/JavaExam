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
	public basicPanelOpenState:any;
	expansionHelpers = EXPANSION_HELPERS;
  questions : IQuestion[];
  questionPrivew : Question;
  questionNo: any;
  	constructor( private questionService: QuestionService) { }

  	ngOnInit() {
      this.questionService.getQuestion().subscribe( data => {
          this.questions = data.content;
          this.questionPrivew =  data.content [0];
          this.questionNo = 1;
          console.log(this.questions)
          console.log(this.questionPrivew)
      });
  	}
  	setStep(index: number) {
	    this.step = index;
	}

	nextStep() {
	    this.step++;
	}

	prevStep() {
	    this.step--;
	}

  openQuestion(question: IQuestion, no: any){
      this.questionPrivew = question;
      this.questionNo = no;
      console.log(this.questionPrivew)
  }
}
