import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private name: string;
  private spent: number;
  private amount: number;
  private message: string = '';

  constructor(private router: Router) {}

  private addCryptoInWallet(): void {
    const data = {
      name: this.name,
      spent: this.spent,
      amount: this.amount,
    };
    this.router.navigate(['detalhes'], {
      queryParams: {
        data: JSON.stringify(data),
      },
    });
  }

  private checkWallet(): void {
    this.router.navigate(['detalhes']);
  }

  private cancelOperation(): void {
    this.name = '';
    this.spent = 0.0;
    this.amount = 0.0;
  }
}
