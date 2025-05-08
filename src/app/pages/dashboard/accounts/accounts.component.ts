// accounts.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  pieChartData: any;
  pieChartOptions: any;

  ngOnInit() {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 426;
  
    this.pieChartData = {
      labels: ['Savings Account', 'Current Account', 'Loan Account'],
      datasets: [
        {
          data: [125000, 85000, 250000],
          backgroundColor: ['#3547BD', '#50A7D9', '#D9416F'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
        }
      ]
    };
  
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#333',
            font: {
              size: isMobile ? 8 : 12 // 👈 Adjust font size for mobile
            }
          }
        }
      }
    };
  }
  
  savingsData = [
    { category: 'Healthcare', amount: 45000, color: '#8E44AD' },
    { category: 'Education', amount: 82000, color: '#2980B9' },
    { category: 'Investment', amount: 18000, color: '#27AE60' },
    { category: 'Others', amount: 8000, color: '#F39C12' }
  ];
  
  totalSavings = this.savingsData.reduce((acc, val) => acc + val.amount, 0);
  
}
