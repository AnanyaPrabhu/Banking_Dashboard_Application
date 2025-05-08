// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DepositApiService {
//     private baseUrl = 'http://localhost:3000/api/deposits';  // Correct URL for POST and GET


//   constructor(private http: HttpClient) {}

//   // Save deposit data (FD or RD)
//   saveDeposit(depositData: any): Observable<any> {
//     return this.http.post(this.baseUrl, depositData);
//   }

//   // Get all deposits
//   getDeposits(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepositApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveDeposit(depositData: any) {
    return this.http.post('http://localhost:3000/deposits', depositData);
  }
  
  

  getAllDeposits() {
    return this.http.get(`${this.baseUrl}/deposits`);
  }
}
