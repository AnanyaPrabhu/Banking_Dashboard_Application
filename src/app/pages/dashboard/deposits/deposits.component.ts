// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// // @Component({
// //   selector: 'app-deposits',
// //   templateUrl: './deposits.component.html',
// //   styleUrl: './deposits.component.scss'
// // })
// // export class DepositsComponent implements OnInit {

// //   addNominee = false;
// //   selectedBalance: string | null = null;
// //   fdForm!: FormGroup;
// //   today = new Date();

// //   accountOptions = [
// //     { label: '304000121315', value: '304000121315' },
// //     { label: '435678645678', value: '435678645678' }
// //   ];

// //   accountBalances: { [key: string]: string } = {
// //     '304000121315': '₹ 2,17,362.23',
// //     '435678645678': '₹ 1,05,600.00'
// //   };

// //   schemeOptions = [
// //     { label: 'Cumulative FD', value: 'cumulative' },
// //     { label: 'Non-Cumulative FD', value: 'non-cumulative' }
// //   ];

// //   frequencyOptions = [
// //     { label: 'Monthly', value: 'monthly' },
// //     { label: 'Quarterly', value: 'quarterly' },
// //     { label: 'Yearly', value: 'yearly' }
// //   ];

// //   constructor(private fb: FormBuilder) { }

// //   ngOnInit(): void {

// //     this.fdForm = this.fb.group({
// //       fromAccount: [null, Validators.required],
// //       scheme: [null, Validators.required],
// //       amount: [null, [Validators.required, Validators.min(1)]],
// //       tenureMonths: [null, Validators.required],
// //       tenureDays: [null, Validators.required],
// //       frequency: [null, Validators.required],
// //       maturity: [null, Validators.required],
// //     });

// //     this.fdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
// //       this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
// //     });
// //   }

// //   submitFDForm() {
// //     if (this.fdForm.valid) {
// //       const formValues = this.fdForm.value;
// //       const selectedMaturity = formValues.maturity;

// //       alert(` ${selectedMaturity === 'renew' ? 'Renewed your Deposit' : 'Closed the Account on Maturity'}`);

// //       // You can also log or send the form data to server here
// //       console.log(formValues);
// //     } else {
// //       // Optional: highlight errors
// //       this.fdForm.markAllAsTouched();
// //     }

// //   }


// // }





// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api'; // Import MessageService
// import { ViewChild } from '@angular/core';


// @Component({
//   selector: 'app-deposits',
//   templateUrl: './deposits.component.html',
//   styleUrls: ['./deposits.component.scss'], // use `styleUrls` (not `styleUrl`)
//   providers: [MessageService] // Provide the MessageService
// })
// export class DepositsComponent implements OnInit {
//   @ViewChild('authForm') authForm!: NgForm;
//   fdRecords: any[] = [];

//   receiptDialog = false;
//   fdReceiptData: any = null;
//   addNominee = false;
//   selectedBalance: string | null = null;
//   fdForm!: FormGroup;
//   today = new Date();

//   showDialog = false;
//   enteredPassword = '';
//   enteredOTP = '';

//   accountOptions = [
//     { label: '304000121315', value: '304000121315' },
//     { label: '435678645678', value: '435678645678' }
//   ];

//   accountBalances: { [key: string]: string } = {
//     '304000121315': '₹ 2,17,362.23',
//     '435678645678': '₹ 1,05,600.00'
//   };

//   schemeOptions = [
//     { label: 'Cumulative FD', value: 'Cumulative' },
//     { label: 'Non-Cumulative FD', value: 'Non-Cumulative' }
//   ];

//   frequencyOptions = [
//     { label: 'Monthly', value: 'Monthly' },
//     { label: 'Quarterly', value: 'Quarterly' },
//     { label: 'Yearly', value: 'Yearly' }
//   ];

//   constructor(private fb: FormBuilder, private messageService: MessageService) { }

//   ngOnInit(): void {
//     this.fdForm = this.fb.group({
//       fromAccount: [null, Validators.required],
//       scheme: [null, Validators.required],
//       amount: [null, [Validators.required, Validators.min(1)]],
//       tenureMonths: [null, Validators.required],
//       tenureDays: [null, Validators.required],
//       frequency: [null, Validators.required],
//       maturity: [null, Validators.required],
//     });

//     this.fdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
//       this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
//     });
//   }

//   submitFDForm() {
//     if (this.fdForm.valid) {
//       this.showDialog = true; // Show password + OTP dialog
//     } else {
//       this.fdForm.markAllAsTouched();
//     }
//   }

//   // verifyCredentials() {
//   //   const correctPassword = 'admin123';
//   //   const correctOTP = '0909';

//   //   if (this.enteredPassword === correctPassword && this.enteredOTP === correctOTP) {
//   //     const maturityOption = this.fdForm.get('maturity')?.value;

//   //     let actionMessage = '';
//   //     if (maturityOption === 'renew') {
//   //       actionMessage = 'FD renewed successfully';
//   //     } else if (maturityOption === 'close') {
//   //       actionMessage = 'FD closed successfully';
//   //     } else {
//   //       actionMessage = 'FD created successfully';
//   //     }

//   //     this.messageService.add({ severity: 'success', summary: 'Success', detail: actionMessage });


//   //     console.log('FD Data:', this.fdForm.value);

//   //     // Reset states
//   //     this.showDialog = false;
//   //     this.enteredPassword = '';
//   //     this.enteredOTP = '';
//   //     this.fdForm.reset();
//   //   } else {
//   //     this.messageService.add({ severity: 'error', summary: 'Authentication Failed', detail: 'Incorrect password or OTP' });
//   //   }
//   // }






//   // verifyCredentials() {
//   //   const correctPassword = 'admin123';
//   //   const correctOTP = '0909';

//   //   if (this.enteredPassword === correctPassword && this.enteredOTP === correctOTP) {
//   //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'FD opened successfully' });

//   //     // Store FD form data to show in receipt
//   //     this.fdReceiptData = this.fdForm.value;

//   //     // Close auth dialog and reset fields
//   //     this.enteredPassword = '';
//   //     this.enteredOTP = '';
//   //     this.showDialog = false;

//   //     // Show receipt dialog
//   //     this.receiptDialog = true;
//   //   } else {
//   //     this.messageService.add({ severity: 'error', summary: 'Authentication Failed', detail: 'Incorrect password or OTP' });
//   //   }
//   // }







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
//     this.fdReceiptData = this.fdForm.value;
//     this.enteredPassword = '';
//     this.enteredOTP = '';
//     this.showDialog = false;
//     this.receiptDialog = true;
//   }
//   onReceiptDialogHide() {
//     // Clear receipt data
//     this.fdReceiptData = null;
  
//     // Reset FD Form completely
//     this.fdForm.reset();
  
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
import { AllDepositsService } from '../../../services/all-deposits.service';
import { DepositApiService } from '../../../services/deposit-api.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
  providers: [MessageService]
})
export class DepositsComponent implements OnInit {
  @ViewChild('authForm') authForm!: NgForm;
  receiptDialog = false;
  fdReceiptData: any = null;
  addNominee = false;
  selectedBalance: string | null = null;
  fdForm!: FormGroup;
  today = new Date();

  showDialog = false;
  enteredPassword = '';
  enteredOTP = '';

  allFDRecords: any[] = []; // Store all FD JSON records here

  accountOptions = [
    { label: '304000121315', value: '304000121315' },
    { label: '435678645678', value: '435678645678' }
  ];

  accountBalances: { [key: string]: string } = {
    '304000121315': '₹ 2,17,362.23',
    '435678645678': '₹ 1,05,600.00'
  };

  schemeOptions = [
    { label: 'Cumulative FD', value: 'Cumulative' },
    { label: 'Non-Cumulative FD', value: 'Non-Cumulative' }
  ];

  frequencyOptions = [
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private depositApiService: DepositApiService) {}

  ngOnInit(): void {
    this.fdForm = this.fb.group({
      fromAccount: [null, Validators.required],
      scheme: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      tenureMonths: [null, Validators.required],
      tenureDays: [null, Validators.required],
      frequency: [null, Validators.required],
      maturity: [null, Validators.required]
    });

    this.fdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
      this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
    });
  }

  submitFDForm() {
    if (this.fdForm.valid) {
      this.showDialog = true;
    } else {
      this.fdForm.markAllAsTouched();
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

    const fdData = this.fdForm.value;

    // Generate unique FD reference
    const refNumber = 'FD' + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
    
    const fdJson = {
      type: 'FD',
      referenceNumber: refNumber,
      timestamp: new Date().toISOString(),
      details: fdData
    };
    
    // this.allFDRecords.push(fdJson); // Store the JSON
    // this.allDepositsService.addFD(fdJson);
    this.depositApiService.saveDeposit(fdJson).subscribe(() => {
      console.log('FD Saved to JSON');
    
    // Store receipt data including reference number
    this.fdReceiptData = {
      ...fdData,
      referenceNumber: refNumber
    };
    this.receiptDialog = true;
  });
    this.enteredPassword = '';
    this.enteredOTP = '';
    this.showDialog = false;
    this.receiptDialog = true;
    
    // console.log('FD JSON Saved:', fdJson);
    
 
}

  onReceiptDialogHide() {
    this.fdReceiptData = null;
    this.fdForm.reset();
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
