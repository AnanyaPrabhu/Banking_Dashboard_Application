// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { DepositApiService } from '../../../services/deposit-api.service';

// @Component({
//   selector: 'app-fd',
//   templateUrl: './fd.component.html',
//   styleUrl: './fd.component.scss',
//   providers: [MessageService]
// })
// export class FdComponent implements OnInit {
//   @ViewChild('authForm') authForm!: NgForm;
//   receiptDialog = false;
//   fdReceiptData: any = null;
//   addNominee = false;
//   selectedBalance: string | null = null;
//   fdForm!: FormGroup;
//   today = new Date();

//   showDialog = false;
//   enteredPassword = '';
//   enteredOTP = '';

//   allFDRecords: any[] = []; // Store all FD JSON records here

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

//   constructor(private fb: FormBuilder, private messageService: MessageService, private depositApiService: DepositApiService) {}

//   ngOnInit(): void {
//     this.fdForm = this.fb.group({
//       fromAccount: [null, Validators.required],
//       scheme: [null, Validators.required],
//       amount: [null, [Validators.required, Validators.min(1)]],
//       tenureMonths: [null, Validators.required],
//       tenureDays: [null, Validators.required],
//       frequency: [null, Validators.required],
//       maturity: [null, Validators.required]
//     });

//     this.fdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount) => {
//       this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
//     });
//   }

//   submitFDForm() {
//     if (this.fdForm.valid) {
//       this.showDialog = true;
//     } else {
//       this.fdForm.markAllAsTouched();
//     }
//   }

//   verifyCredentials(authForm: NgForm) {
//     const correctPassword = 'admin123';
//     const correctOTP = '0909';

//     if (authForm.invalid) return;

//     if (this.enteredPassword !== correctPassword || this.enteredOTP !== correctOTP) {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Authentication Failed',
//         detail: 'Incorrect password or OTP'
//       });
//       return;
//     }

//     const fdData = this.fdForm.value;

//     // Generate unique FD reference
//     const refNumber = 'FD' + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
    
//     const fdJson = {
//       type: 'FD',
//       referenceNumber: refNumber,
//       timestamp: new Date().toISOString(),
//       details: fdData
//     };
    
//     // this.allFDRecords.push(fdJson); // Store the JSON
//     // this.allDepositsService.addFD(fdJson);
//     this.depositApiService.saveDeposit(fdJson).subscribe(() => {
//       console.log('FD Saved to JSON');
    
//     // Store receipt data including reference number
//     this.fdReceiptData = {
//       ...fdData,
//       referenceNumber: refNumber
//     };
//     this.receiptDialog = true;
//   });
//     this.enteredPassword = '';
//     this.enteredOTP = '';
//     this.showDialog = false;
//     this.receiptDialog = true;
    
//     // console.log('FD JSON Saved:', fdJson);
    
 
// }

//   onReceiptDialogHide() {
//     this.fdReceiptData = null;
//     this.fdForm.reset();
//     this.selectedBalance = null;

//     if (this.authForm) {
//       this.authForm.resetForm();
//     }

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

@Component({
  selector: 'app-fd',
  templateUrl: './fd.component.html',
  styleUrls: ['./fd.component.scss'],
  providers: [MessageService]
})
export class FdComponent implements OnInit {
  @ViewChild('authForm') authForm!: NgForm;

  fdForm!: FormGroup;
  today = new Date();

  showDialog = false;
  receiptDialog = false;
  addNominee = false;

  enteredPassword = '';
  enteredOTP = '';

  selectedBalance: string | null = null;
  fdReceiptData: any = null;

  allFDRecords: any[] = [];

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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

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

    this.fdForm.get('fromAccount')?.valueChanges.subscribe((selectedAccount: string) => {
      this.selectedBalance = selectedAccount ? this.accountBalances[selectedAccount] : null;
    });

    // Load FD records from combinedDeposits
    const savedData = localStorage.getItem('combinedDeposits');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.allFDRecords = Array.isArray(parsed)
          ? parsed.filter(entry => entry.type === 'FD')
          : [];
      } catch {
        this.allFDRecords = [];
      }
    }
  }

  submitFDForm(): void {
    if (this.fdForm.valid) {
      this.showDialog = true;
    } else {
      this.fdForm.markAllAsTouched();
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

    const fdData = this.fdForm.value;
    const refNumber = 'FD' + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');

    const fdJson = {
      type: 'FD',
      referenceNumber: refNumber,
      timestamp: new Date().toISOString(),
      details: fdData
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

    combinedArray.push(fdJson);
    localStorage.setItem('combinedDeposits', JSON.stringify(combinedArray));

    this.fdReceiptData = {
      ...fdData,
      referenceNumber: refNumber
    };
    this.receiptDialog = true;

    this.allFDRecords = combinedArray.filter(item => item.type === 'FD');

    this.enteredPassword = '';
    this.enteredOTP = '';
    this.showDialog = false;
  }

  onReceiptDialogHide(): void {
    this.fdReceiptData = null;
    this.fdForm.reset();
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
