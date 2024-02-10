import { Component, OnInit } from '@angular/core';
import { ChatGptResponse } from 'src/app/interface/ChatGptResponse';
import { ChatGptRequestBody } from 'src/app/interface/ChatGtpRequestBody';
import { AskQuestionService } from 'src/app/service/ask-question.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent implements OnInit {
  askQuestion: string = '';
  errorMessage: string = '';
  spinner: boolean = false;
  showAnswerDiv: boolean = false;
  chatGptResponse!: ChatGptResponse;
  finalAnswer: string = '';
  question: string = ';';

  constructor(private _askQuestionService: AskQuestionService) {}

  ngOnInit(): void {}

  getAnswerFromChatGptApi() {
    if (this.askQuestion === '') {
      this.errorMessage = 'Please ask a question';
      this.showAnswerDiv = false;
      return;
    }

    const requestBody: ChatGptRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: this.askQuestion,
        },
      ],
    };

    this.errorMessage = '';
    this.spinner = true;

    this._askQuestionService.getAnswerFromChatGptApi(requestBody).subscribe({
      next: (response: ChatGptResponse) => {
        this.showAnswerDiv = false;
        this.chatGptResponse = response;
        this.finalAnswer = this.chatGptResponse.choices[0].message.content;
      },
      error: (error: Error) => {
        console.error(error.message);
        this.spinner = false;
        this.errorMessage = `Answer not found`;
        this.askQuestion = '';
      },
      complete: () => {
        this.spinner = false;
        this.question = this.askQuestion;
        this.askQuestion = '';
        this.showAnswerDiv = true;
      },
    });
    this.showAnswerDiv = false;
  }

  onKeypressEvent() {
    this.errorMessage = '';
  }
}
