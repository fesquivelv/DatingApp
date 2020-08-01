import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';

@Injectable()
export class MessagestResolver implements Resolve<Message[]> {
  pageNumer = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService, private authService: AuthService,
    private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pageNumer,this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retreiving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }

}
