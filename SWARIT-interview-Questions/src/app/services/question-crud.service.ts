import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  getDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionCRUDService {
  developerRef:CollectionReference;
   phpDocRef:DocumentReference;
   questionsArray: String[] = [];


  constructor(private afs:Firestore){

    this.developerRef = collection(this.afs, "developer");
    this.phpDocRef = doc(this.afs, "developer", "php");

  }
  ngOnInit(): void {
 
  }
  public async getQuestions(title:any){
    const docRef = doc(this.afs, "developer", title.toString());
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let json = docSnap.data();
      Object.keys(json).forEach((question) => {

        this.questionsArray.push(json[question])
      });
    }    
  }

  getQuestionArray(){
    return this.questionsArray;
  }

  clearQuestionArray(){
    return this.questionsArray = [];
  }
 




}
