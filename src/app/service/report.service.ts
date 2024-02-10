import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';
import { SendMessagePayload } from '../interface/SendMessagePayload';
import { Observable } from 'rxjs';
import { ApiResponseObject } from '../interface/ApiResponseObject';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  public generatePdf(weightSlipPayload: any) {
    return this.http.post(`${baseUrl}weightslip`, weightSlipPayload);
  }

  public startApi() {
    return this.http.get(`${baseUrl}`);
  }

  public generateInvoice(invoiceRequest: any) {
    return this.http.post(`${baseUrl}invoice`, invoiceRequest);
  }

  public refresh(): void {
    window.location.reload();
  }

  sendMessage(
    sendMessagePayload: SendMessagePayload
  ): Observable<ApiResponseObject<String>> {
    return this.http.post<ApiResponseObject<String>>(
      `${baseUrl}send-message`,
      sendMessagePayload
    );
  }
}
