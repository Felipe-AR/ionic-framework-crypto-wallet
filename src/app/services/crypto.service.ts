import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';
import { CryptoCurrencyDTO } from '../domain/dtos/CryptoCurrencyDTO';
import ICryptoCurrency from '../interfaces/ICryptoCurrency';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private storage: Storage) {}

  async index(): Promise<CryptoCurrencyDTO[]> {
    const data = (await this.storage.get('crypto')) ?? this.clear();
    return data;
  }

  async get(
    name: string,
    spent: number,
    amount: number,
    id?: string
  ): Promise<CryptoCurrencyDTO> {
    const response = await fetch(
      `${environment.baseAPI}/coins/${name}${environment.baseAPI_query}`
    );
    const data = await response.json();
    const { market_data, image }: ICryptoCurrency = data;

    const cryptoCurrencyDTO = new CryptoCurrencyDTO(name, spent, amount);
    cryptoCurrencyDTO.id = id ?? uuid();
    cryptoCurrencyDTO.image = image;
    cryptoCurrencyDTO.calculateCurrentValue(market_data.current_price.brl);
    cryptoCurrencyDTO.calculateProfitPercentage();
    return cryptoCurrencyDTO;
  }

  async store(cryptoCurrency: CryptoCurrencyDTO): Promise<void> {
    const collection = await this.index();
    collection.push(cryptoCurrency);
    await this.storage.set('crypto', collection);
  }

  async destroy(cryptoCurrencyId: string): Promise<void> {
    const collection = await this.index();
    const index = collection
      .map((crypto) => crypto.id)
      .indexOf(cryptoCurrencyId);
    collection.splice(index, 1);
    await this.storage.set('crypto', collection);
  }

  async clear(): Promise<void> {
    await this.storage.set('crypto', []);
  }

  async refresh(): Promise<void> {
    const collection = await this.index();
    const promises = collection.map(async (crypto) => {
      const response = await this.get(
        crypto.name,
        crypto.spent,
        crypto.amount,
        crypto.id
      );
      return response;
    });
    const results = await Promise.all(promises);
    await this.storage.set('crypto', results);
  }
}
