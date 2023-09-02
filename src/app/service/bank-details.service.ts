import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseObject } from '../interface/ApiResponseObject';
import { BankDetailsResponse } from '../interface/BankDetailsResponse';

const bankDetailsUri =
  'https://restapi-production-d89e.up.railway.app/bank-details';

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
}
