export class CryptoCurrencyDTO {
  public id: string;
  name: string;
  spent: number;
  amount: number;
  current: number;
  percentage?: number;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  created_at: Date;
  constructor(name: string, spent: number, amount: number) {
    this.name = name;
    this.spent = spent;
    this.amount = amount;
    this.created_at = new Date();
  }

  calculateCurrentValue(currentValue: number) {
    this.current = currentValue * this.amount;
  }

  calculateProfitPercentage() {
    this.percentage = (this.current - this.spent) / this.spent;
  }
}
