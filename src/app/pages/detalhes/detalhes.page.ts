import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  private cryptoCurrencies: any[];
  private message = {
    description: '',
    color: 'primary',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params: Params) => {
      if (params && params.data) {
        const { name, spent, amount } = JSON.parse(params.data);
        if (name && spent && amount) {
          try {
            const item = await this.cryptoService.get(name, spent, amount);
            await this.cryptoService.store(item);
          } catch (error) {
            this.message.description = 'Occurred an error in your request';
            this.message.color = 'danger';
          }
        } else {
          this.message.description =
            'Please insert all the required fields in the home screen';
          this.message.color = 'danger';
        }
      }
      await this.update();
    });
  }

  private async update() {
    await this.cryptoService.refresh();
    this.cryptoCurrencies = await this.cryptoService.index();
  }

  private goBackToHomePage() {
    this.router.navigate(['home']);
  }

  private async removeCryptoCurrency(cryptoCurrencyId: string) {
    await this.cryptoService.destroy(cryptoCurrencyId);
    await this.update();
  }

  private async removeAllCryptoCurrencies() {
    this.message.description = 'All the cryptocurrencies was removed!';
    this.message.color = 'success';
    await this.cryptoService.clear();
    await this.update();
  }
}
