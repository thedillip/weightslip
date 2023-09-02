import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseObject } from '../interface/ApiResponseObject';
import { BankDetailsResponse } from '../interface/BankDetailsResponse';
import { RazorBankApiResponse } from '../interface/RazorBankApiResponse';

const bankDetailsUri =
  'https://restapi-production-d89e.up.railway.app/bank-details';

const razorpayUrl = 'https://ifsc.razorpay.com/';

@Injectable({
  providedIn: 'root',
})
export class BankDetailsService {
  constructor(private _httpClient: HttpClient) {}

  getBankDetails(
    ifscCode: string
  ): Observable<ApiResponseObject<BankDetailsResponse>> {
    return this._httpClient.get<ApiResponseObject<BankDetailsResponse>>(
      `${bankDetailsUri}/${ifscCode}`
    );
  }

  getBankDetailsFromRazorPayApi(
    ifscCode: string
  ): Observable<RazorBankApiResponse> {
    return this._httpClient.get<RazorBankApiResponse>(
      `${razorpayUrl}/${ifscCode}`
    );
  }
}
