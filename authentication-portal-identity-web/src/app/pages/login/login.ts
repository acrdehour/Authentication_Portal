import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage.set('');

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.parseApiError(err));
      },
    });
  }

  private parseApiError(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง';
    }

    const problem = err.error;

    if (typeof problem === 'string' && problem.trim()) {
      return problem.trim();
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
      case 401:
        return 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      case 400:
        return 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
      case 500:
        return 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง';
      default:
        return 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
    }
  }
}
