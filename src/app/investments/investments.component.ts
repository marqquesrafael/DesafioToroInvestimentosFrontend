import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { UserInvestiments } from '../models/userInvestiments';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})

export class InvestmentsComponent {

faMoneyCheck = faMoneyCheck;

userInvestiments = new UserInvestiments();

constructor(private authService: AuthService){

const token = this.decodePayloadJWT();
this.getName(token.sub);

}

getName(id: number) {
  this.authService.getUser(id).subscribe(
    {
      next: (res: UserInvestiments) => {
        this.userInvestiments = res;
        console.log(this.userInvestiments)
      },
      error: (error: any) => {
        console.log(error.error);
      }
    }
  );
}

public decodePayloadJWT(): any {
  try {
    const token = window.localStorage.getItem('authToken')?.replace('Bearer ', '');
    return jwt_decode(`${token}`);
  } catch (Error) {
    console.log(Error)
    return null;
  }
}


}


