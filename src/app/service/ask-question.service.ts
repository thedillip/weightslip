import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatGptResponse } from '../interface/ChatGptResponse';
import { ChatGptRequestBody } from '../interface/ChatGtpRequestBody';

const chatGptApiKey = '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';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${chatGptApiKey}`,
});

const requestOptions = { headers: headers };

const chatGptApiUri = 'https://api.openai.com/v1/chat/completions';

@Injectable({
  providedIn: 'root',
})
export class AskQuestionService {
  constructor(private _httpClient: HttpClient) {}

  getAnswerFromChatGptApi(
    chatGptRequest: ChatGptRequestBody
  ): Observable<ChatGptResponse> {
    return this._httpClient.post<ChatGptResponse>(
      chatGptApiUri,
      chatGptRequest,
      requestOptions
    );
  }
}
