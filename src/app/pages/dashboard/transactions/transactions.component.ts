import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  recentTransactions = [
    { title: 'Electricity Bill', amount: '- ₹1,200', date: 'Apr 12, 2025', status: 'Completed' },
    { title: 'Netflix Subscription', amount: '- ₹499', date: 'Apr 10, 2025', status: 'Pending' },
    { title: 'Salary Credited', amount: '+ ₹50,000', date: 'Apr 05, 2025', status: 'Completed' },
    { title: 'UPI to Seema', amount: '- ₹1,000', date: 'Apr 04, 2025', status: 'Failed' }
  ];

  upcomingPayments = [
    { title: 'Credit Card Bill', amount: '₹5,500', dueDate: 'Apr 20, 2025' },
    { title: 'Internet Recharge', amount: '₹899', dueDate: 'Apr 22, 2025' },
    { title: 'Mobile Bill', amount: '₹599', dueDate: 'Apr 25, 2025' }
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }

  barChartData: any;
  barChartOptions: any;

  ngOnInit(): void {
    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Food',
          data: [4500, 5200, 4800, 5000, 5400],
          backgroundColor: '#FF6F61',
          borderRadius: 5
        },
        {
          label: 'Bills',
          data: [2800, 3200, 3100, 2900, 3500],
          backgroundColor: '#FFC107',
          borderRadius: 5
        },
        {
          label: 'Shopping',
          data: [5200, 5400, 4800, 5300, 5700],
          backgroundColor: '#28A745',
          borderRadius: 5
        }
      ]
    };

    this.barChartOptions = {
      indexAxis: 'x',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2.4,
      scales: {
        x: {
          ticks: {
            color: '#000' // black tick labels
          },
          grid: {
            drawOnChartArea: true,
            color: '#e0e0e0', // light grid
            drawBorder: true,      // draw the X-axis line
            borderColor: '#00004d'    // make X-axis line black
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#000' // black tick labels
          },
          grid: {
            drawOnChartArea: true,
            color: '#e0e0e0', // light grid
            drawBorder: true,      // draw the Y-axis line
            borderColor: '#00004d'    // make Y-axis line black
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#00004d'
          }
        }
      }
    };
  }
}
