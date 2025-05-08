import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  combinedDeposits: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/deposits').subscribe(data => {
      this.combinedDeposits = data.map(item => {
        const details = item.details || {};
        return {
          type: item.type || ' ',
          referenceNumber: item.referenceNumber || ' ',
          fromAccount: details.fromAccount || ' ',
          amount: details.amount || 0,
          tenureMonths: details.tenureMonths || 0,
          tenureDays: item.type === 'FD' ? (details.tenureDays || 0) : ' ',
          maturity: details.maturity || '-',
          interestFrequency: item.type === 'FD' ? (details.frequency || '-') : ' ',
          scheme: item.type === 'FD' ? (details.scheme || '-') : ' '
        };
      });
    });
  }
  searchText: string = '';

filteredDeposits() {
  const search = this.searchText?.toLowerCase() || '';
  return this.combinedDeposits.filter(d =>
    d.type.toLowerCase().includes(search) ||
    d.referenceNumber.toLowerCase().includes(search)
  );
}

}
