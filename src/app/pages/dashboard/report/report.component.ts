import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  
  beneficiaries = [
    { name: 'John Doe', account: '1234567890', upiId: 'john.doe@canara', bank: 'Canara Bank' },
    { name: 'Jane Smith', account: '0987654321', upiId: 'jane.smith@axis', bank: 'Axis Bank' }
  ];

  scheduledTransfers = [
    { to: 'John Doe', amount: 5000, date: '2025-09-25' },
    { to: 'Jane Smith', amount: 1000, date: '2025-10-01' }
  ];

  transferHistory = [
    { to: 'Jane Smith', amount: 1000, date: '2025-04-15', status: 'Success' },
    { to: 'John Doe', amount: 2000, date: '2025-04-12', status: 'Failed' }
  ];

  transferForm = {
    to: '',
    amount: 0,
    scheduleDate: ''
  };

  filterStatus = '';

  // Method to filter only future scheduled transfers
  get futureScheduledTransfers() {
    const today = new Date();
    return this.scheduledTransfers.filter(s => new Date(s.date) > today);
  }
  isToday(dateStr: string): boolean {
    const today = new Date();
    const inputDate = new Date(dateStr);
    return inputDate.toDateString() === today.toDateString();
  }
  
  

  makeTransfer() {
    const todayStr = new Date().toISOString().split('T')[0];
  
    if (this.transferForm.scheduleDate) {
      const isToday = this.isToday(this.transferForm.scheduleDate);
  
      if (isToday) {
        // Treat it as an immediate transfer
        this.transferHistory.push({
          to: this.transferForm.to,
          amount: this.transferForm.amount,
          date: todayStr,
          status: 'Success'
        });
      } else {
        // Future transfer goes to scheduled
        this. scheduledTransfers.push({
          to: this.transferForm.to,
          amount: this.transferForm.amount,
          date: this.transferForm.scheduleDate
        });
      }
    } else {
      // No schedule date = immediate transfer
      this.transferHistory.push({
        to: this.transferForm.to,
        amount: this.transferForm.amount,
        date: todayStr,
        status: 'Success'
      });
    }
  
    this.transferForm = { to: '', amount: 0, scheduleDate: '' };
  }

  addBeneficiary(name: string, account: string, upiId: string, bank: string) {
    this.beneficiaries.push({ name, account, bank, upiId });
  }

  get filteredHistory() {
    return this.filterStatus
      ? this.transferHistory.filter(h => h.status === this.filterStatus)
      : this.transferHistory;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'status-success';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }

  // To disable the submit button if any required field is empty
  isSubmitDisabled() {
    return !(this.transferForm.to && this.transferForm.amount && this.transferForm.scheduleDate);
  }
  get selectedBeneficiary() {
    return this.beneficiaries.find(b => b.upiId === this.transferForm.to);
  }
}
