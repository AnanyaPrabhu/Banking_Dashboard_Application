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

@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss'],
  providers: [MessageService]
})
export class RDComponent implements OnInit {
  @ViewChild('authForm') authForm!: NgForm;

  rdForm!: FormGroup;
  today = new Date();

  showDialog = false;
  receiptDialog = false;
  addNominee = false;

  enteredPassword = '';
  enteredOTP = '';

  selectedBalance: string | null = null;
  rdReceiptData: any = null;

  allrdRecords: any[] = [];

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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private depositApiService: DepositApiService
  ) {}

  ngOnInit(): void {
    this.rdForm = this.fb.group({
      fromAccount: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      tenureMonths: [null, Validators.required],
      maturity: [null, Validators.required]
    });

    this.rdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount: string) => {
      this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
    });

    // Load RD records from combinedDeposits
    const savedData = localStorage.getItem('combinedDeposits');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.allrdRecords = Array.isArray(parsed)
          ? parsed.filter(entry => entry.type === 'RD')
          : [];
      } catch {
        this.allrdRecords = [];
      }
    }
  }

  submitRDForm(): void {
    if (this.rdForm.valid) {
      this.showDialog = true;
    } else {
      this.rdForm.markAllAsTouched();
    }
  }

  verifyCredentials(authForm: NgForm): void {
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
    const refNumber = 'RD' + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');

    const rdJson = {
      type: 'RD',
      referenceNumber: refNumber,
      timestamp: new Date().toISOString(),
      details: rdData
    };

    let combinedArray: any[] = [];
    try {
      const existingData = localStorage.getItem('combinedDeposits');
      combinedArray = existingData ? JSON.parse(existingData) : [];
      if (!Array.isArray(combinedArray)) {
        combinedArray = [];
      }
    } catch (error) {
      console.error('Failed to parse combinedDeposits from localStorage', error);
      combinedArray = [];
    }

    combinedArray.push(rdJson);
    localStorage.setItem('combinedDeposits', JSON.stringify(combinedArray));

    this.rdReceiptData = {
      ...rdData,
      referenceNumber: refNumber
    };
    this.receiptDialog = true;

    this.allrdRecords = combinedArray.filter(item => item.type === 'RD');

    this.enteredPassword = '';
    this.enteredOTP = '';
    this.showDialog = false;
  }

  onReceiptDialogHide(): void {
    this.rdReceiptData = null;
    this.rdForm.reset();
    this.selectedBalance = null;

    if (this.authForm) {
      this.authForm.resetForm();
    }

    this.enteredPassword = '';
    this.enteredOTP = '';
  }

  preventDotAndMinus(event: KeyboardEvent): void {
    if (event.key === '.' || event.key === '-') {
      event.preventDefault();
    }
  }
}

