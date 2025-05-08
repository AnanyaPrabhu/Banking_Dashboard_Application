// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api'; // Import MessageService
// import { ViewChild } from '@angular/core';


// @Component({
//   selector: 'app-rd',
//   templateUrl: './rd.component.html',
//   styleUrls: ['./rd.component.scss'],
//   providers: [MessageService] // Provide the MessageService
// })
// export class RDComponent implements OnInit {
//   @ViewChild('authForm') authForm!: NgForm;
//   receiptDialog = false;
//   rdReceiptData: any = null;
//   addNominee = false;
//   selectedBalance: string | null = null;
//   rdForm!: FormGroup;
//   today = new Date();

//   showDialog = false;
//   enteredPassword = '';
//   enteredOTP = '';

//   accountOptions = [
//     { label: '809543234457', value: '809543234457' },
//     { label: '335678645678', value: '335678645678' },
//     { label: '875978658955', value: '875978658955' }
//   ];

//   accountBalances: { [key: string]: string } = {
//     '809543234457': '₹ 2,11,309.23',
//     '335678645678': '₹ 1,05,600.00',
//     '875978658955': '₹ 5,09,340.00'
//   };


//   constructor(private fb: FormBuilder, private messageService: MessageService) { }

//   ngOnInit(): void {
//     this.rdForm = this.fb.group({
//       fromAccount: [null, Validators.required],
//       amount: [null, [Validators.required, Validators.min(1)]],
//       tenureMonths: [null, Validators.required],
//       maturity: [null, Validators.required],
//     });

//     this.rdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
//       this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
//     });
//   }

//   submitRDForm() {
//     if (this.rdForm.valid) {
//       this.showDialog = true; // Show password + OTP dialog
//     } else {
//       this.rdForm.markAllAsTouched();
//     }
//   }
//   verifyCredentials(authForm: NgForm) {
//     const correctPassword = 'admin123';
//     const correctOTP = '0909';

//     if (authForm.invalid) {
//       return; // Let the native validation messages appear
//     }

//     if (this.enteredPassword !== correctPassword || this.enteredOTP !== correctOTP) {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Authentication Failed',
//         detail: 'Incorrect password or OTP'
//       });
//       return;
//     }

//     // Success: show receipt, close auth dialog
//     this.rdReceiptData = this.rdForm.value;
//     this.enteredPassword = '';
//     this.enteredOTP = '';
//     this.showDialog = false;
//     this.receiptDialog = true;
//   }
//   onReceiptDialogHide() {
//     // Clear receipt data
//     this.rdReceiptData = null;

//     // Reset rd Form completely
//     this.rdForm.reset();

//     // Clear selected balance
//     this.selectedBalance = null;

//     // Reset authentication form
//     if (this.authForm) {
//       this.authForm.resetForm(); // 👈 fully resets form controls + state
//     }

//     // Reset password/OTP manually just in case
//     this.enteredPassword = '';
//     this.enteredOTP = '';
//   }

//   preventDotAndMinus(event: KeyboardEvent) {
//     if (event.key === '.' || event.key === '-') {
//       event.preventDefault();
//     }
//   }
// }







import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DepositApiService } from '../../../services/deposit-api.service';
// import { AllDepositsService } from '../../../services/all-deposits.service';

@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss'],
  providers: [MessageService] // Provide the MessageService
})
export class RDComponent implements OnInit {
  @ViewChild('authForm') authForm!: NgForm;
  receiptDialog = false;
  rdReceiptData: any = null;
  addNominee = false;
  selectedBalance: string | null = null;
  rdForm!: FormGroup;
  today = new Date();

  showDialog = false;
  enteredPassword = '';
  enteredOTP = '';

  allrdRecords: any[] = []; // Store all rd JSON records here

  accountOptions = [
    { label: '809543234457', value: '809543234457' },
    { label: '335678645678', value: '335678645678' },
    { label: '875978658955', value: '875978658955' }
  ];

  accountBalances: { [key: string]: string } = {
    '809543234457': '₹ 2,11,309.23',
    '335678645678': '₹ 1,05,600.00',
    '875978658955': '₹ 5,09,340.00'
  };


  constructor(private fb: FormBuilder, private messageService: MessageService, private depositApiService: DepositApiService) { }

  ngOnInit(): void {
    this.rdForm = this.fb.group({
      fromAccount: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      tenureMonths: [null, Validators.required],
      maturity: [null, Validators.required]
    });

    this.rdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
      this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
    });
  }

  submitRDForm() {
    if (this.rdForm.valid) {
      this.showDialog = true;
    } else {
      this.rdForm.markAllAsTouched();
    }
  }

  verifyCredentials(authForm: NgForm) {
    const correctPassword = 'admin123';
    const correctOTP = '0909';

    if (authForm.invalid) return;

    if (this.enteredPassword !== correctPassword || this.enteredOTP !== correctOTP) {
      this.messageService.add({
        severity: 'error',
        summary: 'Authentication Failed',
        detail: 'Incorrect password or OTP'
      });
      return;
    }

    const rdData = this.rdForm.value;

    // Generate unique RD reference
    const refNumber = 'RD' + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');

    const rdJson = {
      type: 'RD',
      referenceNumber: refNumber,
      timestamp: new Date().toISOString(),
      details: rdData
    };
    // console.log('RD Form Value:', this.rdForm.value);


    // Save the deposit to the backend
    this.depositApiService.saveDeposit(rdJson).subscribe(() => {
      console.log('RD Saved to JSON');

      // Store receipt data including reference number
      this.rdReceiptData = {
        ...this.rdForm.value,
        referenceNumber: refNumber
      };
      // console.log('RD Receipt Data:', this.rdReceiptData); // Debug
      this.receiptDialog = true;

    });
    // Reset the form and authentication fields
    this.enteredPassword = '';
    this.enteredOTP = '';
    this.showDialog = false;
    this.receiptDialog = true;

  }


  onReceiptDialogHide() {
    this.rdReceiptData = null;
    this.rdForm.reset();
    this.selectedBalance = null;

    if (this.authForm) {
      this.authForm.resetForm();
    }

    this.enteredPassword = '';
    this.enteredOTP = '';
  }

  preventDotAndMinus(event: KeyboardEvent) {
    if (event.key === '.' || event.key === '-') {
      event.preventDefault();
    }
  }
}
