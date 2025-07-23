import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css',
})
export class NavBarComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  userName = this.authService.getUserInfo().name;
  userType = this.authService.getUserInfo().roles[0].slice(5);
  status = this.authService.verifyStatus();

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

}
