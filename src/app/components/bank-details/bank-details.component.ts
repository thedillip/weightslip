import { Component, OnInit } from '@angular/core';
import { ApiResponseObject } from 'src/app/interface/ApiResponseObject';
import { BankDetailsResponse } from 'src/app/interface/BankDetailsResponse';
import { RazorBankApiResponse } from 'src/app/interface/RazorBankApiResponse';
import { BankDetailsService } from 'src/app/service/bank-details.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css'],
})
export class BankDetailsComponent implements OnInit {
  ifscCode: string = '';
  // bankDetails!: BankDetailsResponse;
  bankDetails!: RazorBankApiResponse;
  showBankDetailsDiv: boolean = false;
  spinner: boolean = false;
  errorMessage: string = '';

  constructor(private _bankDetailsService: BankDetailsService) {}

  ngOnInit(): void {}

  // getBankDetails() {
  //   if (this.ifscCode === '') {
  //     // alert('Please Enter IFSC Code');
  //     this.errorMessage = 'Please Enter IFSC Code'
  //     return;
  //   }
  //   this.errorMessage = '';
  //   this.showBankDetailsDiv = false;
  //   this.spinner = true;

  //   this._bankDetailsService.getBankDetails(this.ifscCode).subscribe({
  //     next: (response: ApiResponseObject<BankDetailsResponse>) => {
  //       this.bankDetails = response.data;
  //     },
  //     error: (error: Error) => {
  //       console.error(error.message);
  //       this.spinner = false;
  //       alert(`Bank Details Not Found with the given IFSC Code`);
  //       this.ifscCode = '';
  //     },
  //     complete: () => {
  //       this.spinner = false;
  //       this.ifscCode = '';
  //       this.showBankDetailsDiv = true;
  //     },
  //   });
  // }

  getBankDetailsFromRazorPayApi() {
    if (this.ifscCode === '') {
      this.errorMessage = 'Please enter IFSC';
      // alert('Please Enter IFSC Code');
      return;
    }
    this.errorMessage = '';
    this.showBankDetailsDiv = false;
    this.spinner = true;

    this._bankDetailsService
      .getBankDetailsFromRazorPayApi(this.ifscCode)
      .subscribe({
        next: (response: RazorBankApiResponse) => {
          this.bankDetails = response;
        },
        error: (error: Error) => {
          console.error(error.message);
          this.spinner = false;
          // alert(`Bank Details Not Found with the given IFSC Code`);
          this.errorMessage = `Bank details not found with IFSC : ${this.ifscCode.toUpperCase()}`;
          this.ifscCode = '';
        },
        complete: () => {
          this.spinner = false;
          this.ifscCode = '';
          this.showBankDetailsDiv = true;
        },
      });
  }
}
