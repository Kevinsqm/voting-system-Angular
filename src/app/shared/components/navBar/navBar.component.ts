import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, TitleCasePipe, NgClass],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.css',
})
export class NavBarComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  userName = this.authService.getDecodedToken()?.name;
  userType = this.authService.getRole();
  accountRoute = this.userType == "VOTER"
    ? "/voter-account"
    : this.userType == "CANDIDATE"
      ? "/candidate-account"
      : "";


  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

}
