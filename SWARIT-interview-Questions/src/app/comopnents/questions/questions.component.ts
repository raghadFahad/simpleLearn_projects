import { Component, OnInit } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';

import { QuestionCRUDService } from 'src/app/services/question-crud.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questionsArray:String[]=[];
  questionTitle = localStorage.getItem('questionTitle')

  constructor(private afs: Firestore, private quesSer:QuestionCRUDService) {
   
   }

  ngOnInit(): void {
   this.quesSer.clearQuestionArray();
   this.quesSer.getQuestions(this.questionTitle);
   this.questionsArray = this.quesSer.getQuestionArray();
    console.log(this.questionsArray);
  }

}


