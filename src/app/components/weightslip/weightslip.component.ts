import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReportService } from 'src/app/service/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weightslip',
  templateUrl: './weightslip.component.html',
  styleUrls: ['./weightslip.component.css'],
})
export class WeightslipComponent implements OnInit {
  constructor(
    private service: ReportService,
    private route: AppRoutingModule
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.startApi().subscribe(
      (data: any) => {
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  isProgress: boolean = false;
  isLoading: boolean = false;

  public weightSlipPayload = {
    address: 'BOUDH',
    vehicleNumber: '',
    grossWeight: '',
    tareWeight: '',
    grossWeightDate: '',
    tareWeightDate: '',
    checked: false,
  };

  formSubmit(reportForm: NgForm) {
    if (
      !this.isValidVehicleNumberPlate(
        this.weightSlipPayload.vehicleNumber.toUpperCase()
      )
    ) {
      Swal.fire({
        position: 'bottom',
        showConfirmButton: false,
        timer: 5000,
        title: 'Error &#10060;',
        text: 'Please enter a valid vehicle number. e.g - OD02AB8329, OD27A9844, MH03DL1234',
      });
      return;
    }

    if (
      this.weightSlipPayload.tareWeight >= this.weightSlipPayload.grossWeight
    ) {
      Swal.fire({
        position: 'bottom',
        showConfirmButton: false,
        timer: 5000,
        title: 'Error &#10060;',
        text: 'Tare Weight can not be more than or same as Gross Weight',
      });
      return;
    }

    this.isProgress = true;

    this.service.generatePdf(this.weightSlipPayload).subscribe(
      (response: any) => {
        let message = response.message;
        console.log(message);

        let byteArray = response.data.byteData;
        let fileName = response.data.fileName;

        const linkSource = `data:application/pdf;base64,${byteArray}`;
        const downloadLink = document.createElement('a');
        const pdfFileName = fileName;
        downloadLink.href = linkSource;
        downloadLink.download = pdfFileName;
        downloadLink.click();

        // var byteCharacters = atob(byteArray);
        // var byteNumbers = new Array(byteCharacters.length);
        // for (var i = 0; i < byteCharacters.length; i++) {
        //   byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // var byteArray2 = new Uint8Array(byteNumbers);
        // var file = new Blob([byteArray2], { type: 'application/pdf;base64' });
        // var fileURL = URL.createObjectURL(file);
        // window.open(fileURL);

        this.isProgress = false;
        Swal.fire({
          icon: 'success',
          title: 'Success &#128540;',
          text: message,
          timer: 6000,
        }).then(() => {
          // this.service.refresh();
          reportForm.controls['vehicleNumber'].reset();
          reportForm.controls['grossWeight'].reset();
          reportForm.controls['grossWeightDate'].reset();
          reportForm.controls['tareWeight'].reset();
          reportForm.controls['tareWeightDate'].reset();
          reportForm.controls['checked'].reset();
        });
      },
      (error) => {
        this.isProgress = false;
        // console.log(error);
        // alert('Something Went Wrong !!');
        Swal.fire({
          icon: 'error',
          title: 'Oops... &#10071;',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          // this.service.refresh();
          // reportForm.reset();
          reportForm.controls['vehicleNumber'].reset();
          reportForm.controls['grossWeight'].reset();
          reportForm.controls['grossWeightDate'].reset();
          reportForm.controls['tareWeight'].reset();
          reportForm.controls['tareWeightDate'].reset();
          reportForm.controls['checked'].reset();
        });
      }
    );
  }

  isValidVehicleNumberPlate(indianVehicleNumber: string): boolean {
    let indianVehicleNumberRegex: RegExp = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
    let regex: RegExp = new RegExp(indianVehicleNumberRegex);
    let flag = regex.test(indianVehicleNumber);
    return regex.test(indianVehicleNumber);
  }
}
