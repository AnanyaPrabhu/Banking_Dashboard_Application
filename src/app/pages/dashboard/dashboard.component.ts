// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   activeSection: string = 'overview';  // Default to 'overview'
//   isSidebarCollapsed = false; // Track if sidebar is collapsed

//   // Define breadcrumb items
//   breadcrumbItems: any[] = [
//     {
//       label: 'Overview',
//       section: 'overview',
//       command: () => this.setActiveSection('overview')
//     },
//     {
//       label: 'Accounts',
//       section: 'accounts',
//       command: () => this.setActiveSection('accounts')
//     },
//     {
//       label: 'Transactions',
//       section: 'transactions',
//       command: () => this.setActiveSection('transactions')
//     },
//     {
//       label: 'Transfer',
//       section: 'transfer',
//       command: () => this.setActiveSection('transfer')
//     },
//     {
//       label: 'Fixed Deposit',
//       section: 'deposits',
//       command: () => this.setActiveSection('deposits')
//     },
//     {
//       label: 'Recurring Deposit',
//       section: 'rd',
//       command: () => this.setActiveSection('rd')
//     }
//   ];

//   constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

//   // Method to set the active section based on breadcrumb click
//   setActiveSection(section: string) {
//     this.activeSection = section;
//     this.router.navigate([`/dashboard/${section}`]);  // Navigate to the corresponding route
//   }

//   ngOnInit() {
//     document.body.style.backgroundColor = 'white';

//     const currentUrl = this.router.url;

//     // If the user refreshes or lands on /dashboard, redirect to /dashboard/overview
//     if (currentUrl === '/dashboard' || currentUrl === '/dashboard/') {
//       this.activeSection = 'overview';
//       this.router.navigate(['/dashboard/overview']);
//     } else {
//       const section = currentUrl.split('/').pop();
//       this.activeSection = section || 'overview';
//     }

//     // Listen for route changes to update the layout
//     this.router.events.subscribe(() => {
//       const currentRoute = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
//       this.isSidebarCollapsed = currentRoute === 'deposits' || currentRoute === 'rd';
//     });

//   }


//   toggleSidebar() {
//     this.isSidebarCollapsed = !this.isSidebarCollapsed;
//   }

//   // Call when the sidebar collapse state changes
//   onSidebarCollapseChanged(collapsed: boolean) {
//     this.isSidebarCollapsed = collapsed;
//   }
// }










import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeSection: string = 'overview';
  breadcrumbLabel: string = 'Overview';
  breadcrumbItems: any[] = [];
  isSidebarCollapsed = false;
  isSidebarVisibleOnMobile = false;

  onToggleSidebar() {
    this.isSidebarVisibleOnMobile = !this.isSidebarVisibleOnMobile;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = 'white';

    // Set active section and breadcrumb on page load
    const currentUrl = this.router.url;
    const section = currentUrl.split('/').pop() || 'overview';
    this.updateSectionAndBreadcrumb(section);

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
      this.updateSectionAndBreadcrumb(route || 'overview');
    });
  }

  updateSectionAndBreadcrumb(section: string) {
    this.activeSection = section;
    this.breadcrumbLabel = this.getBreadcrumbLabel(section);
    this.isSidebarCollapsed = ['fd', 'rd', 'view'].includes(section);
  
    // Check if the section is 'deposits' or 'rd'
    if (section === 'fd' || section === 'rd') {
      this.breadcrumbItems = [
        // { icon: 'pi pi-home', routerLink: '/dashboard' },  // Home icon with link
        { label: 'Deposits', style: { cursor: 'default' }},  // Label for Deposits without a link
        { label: this.breadcrumbLabel }  // Add FD or RD based on the section (e.g., 'Fixed Deposit' or 'Recurring Deposit')
      ];
    } else {
      // For all other sections, just display the current section label
      this.breadcrumbItems = [
        { label: this.breadcrumbLabel }
      ];
    }
  }
  

  getBreadcrumbLabel(section: string): string {
    const labels: { [key: string]: string } = {
      overview: '',
      accounts: 'Accounts',
      transactions: 'Transactions',
      transfer: 'Transfer',
      fd: 'Fixed Deposit',  // For Fixed Deposit section
      rd: 'Recurring Deposit',  // For Recurring Deposit section
      view: 'View Deposits'
    };
    return labels[section] || '';
  }

  setActiveSection(section: string) {
    this.router.navigate([`/dashboard/${section}`]);
  }

 
  screenWidth: number = window.innerWidth;
  
  toggleSidebar() {
    if (this.screenWidth < 768) {
      // Only overlay for fd, rd, view, overview (or any small screen view)
      if (['fd', 'rd', 'view', 'overview'].includes(this.activeSection)) {
        this.isSidebarVisibleOnMobile = !this.isSidebarVisibleOnMobile;
      }
    }
  }

  onSidebarCollapseChanged(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
  
}
