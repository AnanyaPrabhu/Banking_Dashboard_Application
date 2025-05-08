import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllDepositsService {
  private rdData: any[] = [];
  private fdData: any[] = [];

  addRD(record: any) {
    this.rdData.push(record);
  }

  addFD(record: any) {
    this.fdData.push(record);
  }

  getRDs(): any[] {
    return this.rdData;
  }

  getFDs(): any[] {
    return this.fdData;
  }

  clearAll() {
    this.rdData = [];
    this.fdData = [];
  }
}
