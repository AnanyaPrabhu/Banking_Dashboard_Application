// import { Component, OnInit, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-overview',
//   templateUrl: './overview.component.html',
//   styleUrl: './overview.component.scss'
// })
// export class OverviewComponent implements OnInit {
//   // ngAfterViewInit(): void {
//   //   // This helps PrimeNG charts recalculate their dimensions
//   //   setTimeout(() => {
//   //     window.dispatchEvent(new Event('resize'));
//   //   }, 0);
//   // }

//   @ViewChild('myChart') chart: any;

// ngAfterViewInit(): void {
//   setTimeout(() => {
//     window.dispatchEvent(new Event('resize'));
//     this.chart?.refresh();
//   }, 0);
// }

//   chartOptions: any;
//   savingsChartData: any;
//   // ngOnInit(){
//   // this.savingsChartData = {
//   //   labels: ['Remaining', 'Used'],
//   //   datasets: [
//   //     {
//   //       data: [82, 18],
//   //       backgroundColor: ['#005fa3', '#8ac2f4'],
//   //       hoverBackgroundColor: ['#6A11CB', '#cccccc']
//   //     }
//   //   ]
//   // };

//   // this.chartOptions = {
//   //   maintainAspectRatio: false, // Allows resizing
//   //   aspectRatio:1.7 ,
//   //   cutout: '70%',
//   //   plugins: {
//   //     legend: {
//   //       display: false
//   //     }
//   //   }
//   // };

//   // }
//   totalInvestment = 0;
//   fdCount = 0;
//   rdCount = 0;
//   totalFD = 0;
//   totalRD = 0;
//   highestLabel = '';
//   highestPercentage: string = '';
//   constructor(private http: HttpClient) { }


//   ngOnInit() {
//     const screenWidth = window.innerWidth;
//     const isMobile = screenWidth <= 426;
//     this.loadDeposits();
//     this.chartOptions = {
//       maintainAspectRatio: false, // Allows resizing
//       aspectRatio: 1.7,
//       cutout: '60%',
//       plugins: {
//         legend: { position: 'right' }
//       },
//       font: {
//         size: isMobile ? 6 : 12 // 👈 Adjust font size for mobile
//       }
//     };
//   }

//   loadDeposits() {
//     this.http.get<any[]>('http://localhost:3000/deposits').subscribe(data => {
//       this.totalInvestment = 0;
//       this.fdCount = 0;
//       this.rdCount = 0;
//       this.totalFD = 0;
//       this.totalRD = 0;

//       data.forEach(deposit => {
//         const amount = deposit.details.amount;
//         this.totalInvestment += amount;

//         if (deposit.type === 'FD') {
//           this.fdCount++;
//           this.totalFD += amount;
//         } else if (deposit.type === 'RD') {
//           this.rdCount++;
//           this.totalRD += amount;
//         }
//       });
//       const total = this.totalFD + this.totalRD;

//       if (this.totalFD >= this.totalRD) {
//         this.highestLabel = 'FD';
//         this.highestPercentage = ((this.totalFD / total) * 100).toFixed(2);
//       } else {
//         this.highestLabel = 'RD';
//         this.highestPercentage = ((this.totalRD / total) * 100).toFixed(2);
//       }

//       this.savingsChartData = {
//         labels: [`FDs (${this.fdCount})`, `RDs (${this.rdCount})`],
//         datasets: [{
//           data: [this.fdCount, this.rdCount],
//           backgroundColor: ['#005fa3', '#8ac2f4'],
//           hoverBackgroundColor: ['#6A11CB', '#cccccc']
//         }]
//       };
//     });
//   }




//   cards: any[] = [
//     {
//       title: 'Offers for you!!',
//       items: [
//         {
//           icon: 'pi pi-credit-card',
//           heading: 'Credit Card',
//           description: 'Get the right card for you.'
//         },
//         {
//           icon: 'pi pi-car',
//           heading: 'Home Loan',
//           description: 'Digital sanction with benefit of special processing fee.'
//         }
//       ]
//     },
//     {
//       title: 'Grow your Investment',
//       items: [
//         { icon: 'pi pi-wallet', heading: 'Fixed Deposit', description: '' },
//         // { icon: 'pi pi-chart-line', heading: 'Invest in Stocks', description: '' },
//         { icon: 'pi pi-users', heading: 'Mutual Fund', description: '' },
//         { icon: 'pi pi-briefcase', heading: 'Retirement Planning', description: '' }
//       ]
//     },
//     {
//       title: 'Loans',
//       items: [
//         { icon: 'pi pi-money-bill', heading: 'Active', description: '2 loans ongoing' },
//         { icon: 'pi pi-percentage', heading: 'Interest', description: '7.2% average' }
//       ]
//     },
//     {
//       title: 'Banking Needs & Resolution',
//       items: [
//         { icon: 'pi pi-info-circle', heading: 'Track Applications', description: 'Service Requests' },
//         { icon: 'pi pi-phone', heading: '1800 1080', description: 'Customer care' }
//       ]
//     }
//   ];

//   responsiveOptions = [
//     {
//       breakpoint: '1024px',
//       numVisible: 3,
//       numScroll: 1
//     },
//     {
//       breakpoint: '768px',
//       numVisible: 2,
//       numScroll: 1
//     },
//     {
//       breakpoint: '560px',
//       numVisible: 1,
//       numScroll: 1
//     }
//   ];


// }






import { Component, OnInit, ViewChild } from '@angular/core';

// Define the Deposit interface
interface Deposit {
  type: string;  // 'FD' or 'RD'
  details: {
    amount: number;
  };
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @ViewChild('myChart') chart: any;

  // After view initialization, trigger a resize event to ensure the chart is recalculated properly
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      this.chart?.refresh();
    }, 0);
  }

  chartOptions: any;
  savingsChartData: any;

  totalInvestment = 0;
  fdCount = 0;
  rdCount = 0;
  totalFD = 0;
  totalRD = 0;
  highestLabel = '';
  highestPercentage: string = '';

  constructor() { }

  ngOnInit() {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 426;
    this.loadDeposits(); // Load deposits from localStorage
    this.chartOptions = {
      maintainAspectRatio: false, // Allows resizing
      aspectRatio: 1.7,
      cutout: '60%',
      plugins: {
        legend: { position: 'right' }
      },
      font: {
        size: isMobile ? 6 : 12 // 👈 Adjust font size for mobile
      }
    };
  }

  // Load deposits data from localStorage
  loadDeposits() {
    // Retrieve combined FD & RD data from localStorage
    const storedData = localStorage.getItem('combinedDeposits');

    if (storedData) {
      const deposits: Deposit[] = JSON.parse(storedData);  // Typing the deposits array
      this.totalInvestment = 0;
      this.fdCount = 0;
      this.rdCount = 0;
      this.totalFD = 0;
      this.totalRD = 0;

      // Process each deposit and calculate the totals
      deposits.forEach((deposit: Deposit) => {  // Typing the 'deposit' parameter
        const amount = deposit.details.amount;
        this.totalInvestment += amount;

        if (deposit.type === 'FD') {
          this.fdCount++;
          this.totalFD += amount;
        } else if (deposit.type === 'RD') {
          this.rdCount++;
          this.totalRD += amount;
        }
      });

      const total = this.totalFD + this.totalRD;

      // Determine the type with the highest percentage
      if (this.totalFD >= this.totalRD) {
        this.highestLabel = 'FD';
        this.highestPercentage = ((this.totalFD / total) * 100).toFixed(2);
      } else {
        this.highestLabel = 'RD';
        this.highestPercentage = ((this.totalRD / total) * 100).toFixed(2);
      }

      // Prepare chart data
      this.savingsChartData = {
        labels: [`FDs (${this.fdCount})`, `RDs (${this.rdCount})`],
        datasets: [{
          data: [this.fdCount, this.rdCount],
          backgroundColor: ['#005fa3', '#8ac2f4'],
          hoverBackgroundColor: ['#6A11CB', '#cccccc']
        }]
      };
    }
  }

  // Cards and other UI-related properties
  cards: any[] = [
    {
      title: 'Offers for you!!',
      items: [
        {
          icon: 'pi pi-credit-card',
          heading: 'Credit Card',
          description: 'Get the right card for you.'
        },
        {
          icon: 'pi pi-car',
          heading: 'Home Loan',
          description: 'Digital sanction with benefit of special processing fee.'
        }
      ]
    },
    {
      title: 'Grow your Investment',
      items: [
        { icon: 'pi pi-wallet', heading: 'Fixed Deposit', description: '' },
        { icon: 'pi pi-users', heading: 'Mutual Fund', description: '' },
        { icon: 'pi pi-briefcase', heading: 'Retirement Planning', description: '' }
      ]
    },
    {
      title: 'Loans',
      items: [
        { icon: 'pi pi-money-bill', heading: 'Active', description: '2 loans ongoing' },
        { icon: 'pi pi-percentage', heading: 'Interest', description: '7.2% average' }
      ]
    },
    {
      title: 'Banking Needs & Resolution',
      items: [
        { icon: 'pi pi-info-circle', heading: 'Track Applications', description: 'Service Requests' },
        { icon: 'pi pi-phone', heading: '1800 1080', description: 'Customer care' }
      ]
    }
  ];

  // Responsive options for cards
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
