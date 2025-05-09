// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-view',
//   templateUrl: './view.component.html',
//   styleUrls: ['./view.component.scss']
// })
// export class ViewComponent implements OnInit {
//   combinedDeposits: any[] = [];

//   constructor(private http: HttpClient) { }

//   ngOnInit() {
//     this.http.get<any[]>('http://localhost:3000/deposits').subscribe(data => {
//       this.combinedDeposits = data.map(item => {
//         const details = item.details || {};
//         return {
//           type: item.type || ' ',
//           referenceNumber: item.referenceNumber || ' ',
//           fromAccount: details.fromAccount || ' ',
//           amount: details.amount || 0,
//           tenureMonths: details.tenureMonths || 0,
//           tenureDays: item.type === 'FD' ? (details.tenureDays || 0) : ' ',
//           maturity: details.maturity || '-',
//           interestFrequency: item.type === 'FD' ? (details.frequency || '-') : ' ',
//           scheme: item.type === 'FD' ? (details.scheme || '-') : ' '
//         };
//       });
//     });
//   }
//   searchText: string = '';

// filteredDeposits() {
//   const search = this.searchText?.toLowerCase() || '';
//   return this.combinedDeposits.filter(d =>
//     d.type.toLowerCase().includes(search) ||
//     d.referenceNumber.toLowerCase().includes(search)
//   );
// }

// }





















import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  combinedDeposits: any[] = []; // Store both FD and RD records combined

  searchText: string = ''; // For search functionality

  ngOnInit() {
    // Retrieve combined FD & RD data from localStorage
    const storedData = localStorage.getItem('combinedDeposits');

    if (storedData) {
      const deposits = JSON.parse(storedData);
      deposits.forEach((entry: any) => {
        if (entry.type === 'FD') {
          this.combinedDeposits.push({
            type: 'FD',
            referenceNumber: entry.referenceNumber || ' ',
            fromAccount: entry.details?.fromAccount || ' ',
            amount: entry.details?.amount || 0,
            tenureMonths: entry.details?.tenureMonths || 0,
            tenureDays: entry.details?.tenureDays || 0,
            maturity: entry.details?.maturity || '-',
            interestFrequency: entry.details?.frequency || '-',
            scheme: entry.details?.scheme || '-'
          });
        } else if (entry.type === 'RD') {
          this.combinedDeposits.push({
            type: 'RD',
            referenceNumber: entry.referenceNumber || ' ',
            fromAccount: entry.details?.fromAccount || ' ',
            amount: entry.details?.amount || 0,
            tenureMonths: entry.details?.tenureMonths || 0,
            maturity: entry.details?.maturity || '-'
          });
        }
      });
    }
  }

  // Function to filter the displayed deposits based on search text
  filteredDeposits() {
    const search = this.searchText?.toLowerCase() || '';
    return this.combinedDeposits.filter(d =>
      d.type.toLowerCase().includes(search) ||
      d.referenceNumber.toLowerCase().includes(search) ||
      d.fromAccount.toLowerCase().includes(search)
    );
  }
}
