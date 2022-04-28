import { Component, Injectable, OnInit } from '@angular/core';
import { EXPANSION_HELPERS } from './helpers.data';
import { IQuestion, Question } from './question';
import { QuestionService } from './expansion-panel.service';
import { interval } from 'rxjs';
import { HighlightService } from '../../../service/highlight.service';

@Component({
  selector: 'cdk-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  htmlContent: string = `<pre>
  <code class=\"language-java\">
  <p><strong>public</strong> <strong>class</strong> Main {&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>private</strong> int i = 1;&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>public</strong> <strong>static</strong> void main(String argv[]) {&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int i = 2;&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Main s = <strong>new</strong> Main();&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s.someMethod();&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>public</strong> <strong>static</strong> void someMethod(){&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(i);&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;</p>
  </code></pre>
  `
  private highlighted: boolean = false


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
  constructor(private questionService: QuestionService, private highlightService: HighlightService) {}

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll()
      this.highlighted = true
    }
  }

  ngOnInit() {
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      data.forEach(item => {
        item.answerDTOS.forEach((element)=>{
          element["status"] = false;
        });
      });
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

  onClickChecBox(item){
    this.questions.forEach((element) => {
      element.answerDTOS.forEach((record)=>{
        if(record.status == false){
          if(record.id == item.id) {
            record.status = true;
          }
        }
        else {
          if(record.id == item.id) {
            record.status = false;
          }
        }
      })
    })
    console.log(this.questions);
  }
}
