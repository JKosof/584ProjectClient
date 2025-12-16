import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { Subject, takeUntil } from 'rxjs';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, 
            MatToolbarModule,
            MatIconModule,
            MatButtonModule
           ],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBar implements OnInit, OnDestroy {
  private destroy = new Subject();
  isLoggedIn! : boolean;
  constructor(public authService: AuthService, private router: Router, private updateService: UpdateService) {
    authService.authStatus.pipe(takeUntil(this.destroy)).subscribe(result => {
      this.isLoggedIn = result;
    });
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
   update(): void {
    this.updateService.updateItems().subscribe({
      next: response => {
        console.log('Update successful:', response);
        // Handle success (e.g., show a success message, refresh data)
        window.location.reload();
      },
      error: error => {
        console.error('Update failed:', error);
        // Handle error (e.g., show an error message)
      }
    })   
   }
}
