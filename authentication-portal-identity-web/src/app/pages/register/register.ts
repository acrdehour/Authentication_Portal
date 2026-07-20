import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.errorMessage.set('');

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.parseApiError(err));
      },
    });
  }

  private parseApiError(err: HttpErrorResponse): string {
    if (err.status === 0) {
    return 'Unable to connect to the server. Please try again.';
}

    const problem = err.error;

    if (typeof problem === 'string' && problem.trim()) {
      return problem.trim();
    }
    if (problem?.errors) {

    const messages = Object.values(problem.errors)
        .flat()
        .join('\n');

    return messages;
}

    if (problem && typeof problem === 'object') {
      if (typeof problem.detail === 'string' && problem.detail.trim()) {
        return problem.detail;
      }

      if (typeof problem.title === 'string' && problem.title.trim()) {
        return problem.title;
      }
    }

    switch (err.status) {
      case 409:
        return 'This username is already taken';
      case 400:
        return 'Invalid data. Please check again';
      case 500:
        return 'Server error. Please try again';
      default:
        return 'An error occurred. Please try again';
    }
  }
}
