import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

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
}
