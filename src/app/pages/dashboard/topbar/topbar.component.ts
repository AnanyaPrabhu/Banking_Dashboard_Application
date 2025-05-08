import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  dropdownOpen = false;
  currentDate = new Date();


  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;
  @Output() toggleSidebar = new EventEmitter<void>();

  onHamburgerClick(): void {
    this.toggleSidebar.emit();
  }
  constructor(private authService: AuthService, private router: Router) { }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  // isSidebarVisibleOnMobile: boolean = false;

  
  // toggleSidebar() {
  //   this.isSidebarVisibleOnMobile = !this.isSidebarVisibleOnMobile;
  // }

  // 👇 Detect click outside dropdown
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInsideMenu = this.dropdownMenu?.nativeElement.contains(event.target);
    const clickedToggle = this.dropdownToggle?.nativeElement.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      this.dropdownOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Logging out...');

  }
}
