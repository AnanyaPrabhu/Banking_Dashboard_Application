// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.scss'
// })
// export class SidebarComponent {
//   @Input() activeSection: string = '';
//   @Output() sectionChanged = new EventEmitter<string>();

//   changeSection(section: string) {
//     this.sectionChanged.emit(section);
//   }
// }





// import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit {
//   @Input() activeSection: string = '';
//   @Output() sectionChanged = new EventEmitter<string>();

//   isCollapsed: boolean = false;

//   constructor(private router: Router) {}

//   ngOnInit() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.toggleSidebar(event.urlAfterRedirects);
//       }
//     });
//   }

//   toggleSidebar(currentUrl: string) {
//     this.isCollapsed = currentUrl.includes('/dashboard/deposits');
//   }

//   changeSection(section: string) {
//     this.sectionChanged.emit(section);
//   }
// }





// import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit {
//   @Input() activeSection: string = '';
//   @Output() sectionChanged = new EventEmitter<string>();
//   @Output() collapseChanged = new EventEmitter<boolean>();

//   isCollapsed = false;
//   toggleCollapse() {
//     this.isCollapsed = !this.isCollapsed;
//     this.collapseChanged.emit(this.isCollapsed);
//   }

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     this.setActiveFromRoute(this.router.url); // handle initial load

//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.setActiveFromRoute(event.urlAfterRedirects);
//       }
//     });
//   }

//   setActiveFromRoute(url: string): void {
//     // Extract the section name from URL like '/dashboard/accounts'
//     const match = url.match(/\/dashboard\/(\w+)/);
//     if (match && match[1]) {
//       const section = match[1];
//       this.activeSection = section;
//       // this.isCollapsed = section === 'deposits';
//       this.isCollapsed = ['deposits', 'rd', 'view'].includes(section);
//     }
//   }

//   changeSection(section: string): void {
//     this.sectionChanged.emit(section);
//     this.activeSection = section;
//     // this.isCollapsed = section === 'deposits';
//     this.isCollapsed = ['deposits', 'rd', 'view'].includes(section);
//   }

// }



import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() activeSection: string = '';
  @Output() sectionChanged = new EventEmitter<string>();
  @Output() collapseChanged = new EventEmitter<boolean>();
  @Input() isSidebarVisibleOnMobile: boolean = false;


  showDeposits: boolean = false; // To toggle visibility of deposits options
  isCollapsed: boolean = false; // Tracks whether the sidebar is collapsed
  activeRoute: string = '';      // Tracks the active route in the submenu
  showRightPanel: boolean = false; // Controls the visibility of the right panel

  constructor(private router: Router) { }


  // isSidebarVisibleOnMobile: boolean = false;

  
  // toggleSidebar() {
  //   this.isSidebarVisibleOnMobile = !this.isSidebarVisibleOnMobile;
  // }
  


  // Toggle for collapsing the sidebar
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseChanged.emit(this.isCollapsed);
  
    // Close right panel when sidebar is expanded
    if (!this.isCollapsed) {
      this.showRightPanel = false;
    }
  }

  // Show or hide deposits options when clicking on deposits label or icon
  toggleDeposits(): void {
    if (this.isCollapsed) {
      // If sidebar is collapsed, show the right panel instead of the submenu
      this.showRightPanel = !this.showRightPanel;
    } else {
      // If sidebar is expanded, toggle Deposits submenu
      this.showDeposits = !this.showDeposits;
  
      // Force right panel to always be hidden when expanded
      this.showRightPanel = false;
    }
  }

  // Method to handle the click event on the Deposits icon
  onDepositsClick(): void {
    if (this.isCollapsed) {
      // If the sidebar is collapsed, show the right panel
      this.showRightPanel = !this.showRightPanel;
    } else {
      // If the sidebar is expanded, toggle the submenu for deposits
      this.showDeposits = !this.showDeposits;
  
      // Force right panel to always be hidden when expanded
      this.showRightPanel = false;
    }
  }

  // Method to handle hover over Deposits icon to display right panel
  onDepositsHover(): void {
    if (this.isCollapsed) {
      this.showRightPanel = true; // Show right panel on hover when sidebar is collapsed
    }
  }

  // Method to handle hover out event on Deposits icon (hide right panel)
  onDepositsHoverOut(): void {
    if (this.isCollapsed) {
      this.showRightPanel = false; // Hide right panel on hover out when sidebar is collapsed
    }
  }

  // Close right panel if clicked outside of sidebar or right panel
  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const rightPanel = document.querySelector('.right-panel');
    if (this.isCollapsed && !sidebar?.contains(event.target as Node) && !rightPanel?.contains(event.target as Node)) {
      this.showRightPanel = false; // Close the right panel if clicked outside
    }
  }

  changeSection(section: string): void {
    this.activeSection = section;
    this.activeRoute = section;
    this.sectionChanged.emit(section);
    
  
    if (section === 'fd' || section === 'rd') {
      this.showDeposits = false; // Close submenu if expanded
    }
  
    // Collapse sidebar if deposits or view selected
    this.isCollapsed = this.isDepositsChildActive() || this.activeSection === 'view';
  
    // Hide right panel when clicking submenu items (FD, RD) when sidebar is expanded
    if (!this.isCollapsed) {
      this.showRightPanel = false;
    }
    
  }

  isDepositsChildActive(): boolean {
    return ['fd', 'rd'].includes(this.activeSection); 
  }

  ngOnInit(): void {
    this.setActiveFromRoute(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveFromRoute(event.urlAfterRedirects);
        this.showRightPanel = false; // Close right panel on route change
      }
    });
  }
  isCollapsedForRoutes(): boolean {
    return ['fd', 'rd', 'view'].includes(this.activeRoute);
  }

  setActiveFromRoute(url: string): void {
    const match = url.match(/\/dashboard\/(\w+)/);
    if (match && match[1]) {
      this.activeSection = match[1];
      this.activeRoute = match[1];
      this.isCollapsed = ['fd', 'rd', 'view'].includes(this.activeSection); 
    }
  }
}
