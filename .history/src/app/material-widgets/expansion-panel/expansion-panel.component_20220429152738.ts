import { Component, Injectable, OnInit } from '@angular/core';
import { EXPANSION_HELPERS } from './helpers.data';
import { IQuestion, Question } from './question';
import { QuestionService } from './expansion-panel.service';
import { interval } from 'rxjs';
import { HighlightService } from '../../../service/highlight.service';
import { LocalStorageService } from '../../../service/local-storage.service';

@Component({
  selector: 'cdk-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  private highlighted: boolean = false;
  point = 0;
  step = 0;
  public basicPanelOpenState: any;
  expansionHelpers = EXPANSION_HELPERS;
  questions: IQuestion[];
  questionPrivew: Question;
  // currentQuestion : number =1;
  questionNo: number = 0;
  couter = 300;
  currentAnswers: any;
  interval$: any;
  constructor(
    private questionService: QuestionService,
    private highlightService: HighlightService,
    private localStorageService: LocalStorageService
  ) {}

  // show đoạn code ví dụ lên html
  ngAfterViewChecked() {
    // if (!this.highlighted) {
    this.highlightService.highlightAll();
    // this.highlighted = true;
    // }
  }

  ngOnInit() {
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      data.forEach((item) => {
        item.answerDTOS.forEach((element) => {
          element['status'] = false;
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
        this.couter = 300;
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
    this.couter = 300;
    this.startCouter();
  }
  resetQuiz() {
    this.resetCouter();
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      console.log(this.questions);
      this.couter = 300;
    });
  }

  onClickChecBox(item) {
    this.questions.forEach((element) => {
      element.answerDTOS.forEach((record) => {
        if (record.status == false) {
          if (record.id == item.id) {
            record.status = true;
          }
        } else {
          if (record.id == item.id) {
            record.status = false;
          }
        }
      });
    });
  }

  onClickMark() {
    let Tongsocaudung = 0;
    let socaudung = 0;
    this.questions.forEach((item) => {
      item.answerDTOS.forEach((element) => {
        if (element.corectAnswer === true) {
          Tongsocaudung++;
          if (element.status === true) {
            socaudung++;
          }
        }
      });
      if (Tongsocaudung == socaudung) {
        this.point++;
      }
    });
    console.log(this.point);
  }

  processScoreExam() {
    console.log(this.questions);
    this.localStorageService.setQuestions(this.questions);
  }
}
