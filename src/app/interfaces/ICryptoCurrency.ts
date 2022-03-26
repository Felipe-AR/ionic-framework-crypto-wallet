interface ICryptoCurrency {
  market_data: {
    current_price: {
      brl: number;
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

export default ICryptoCurrency;
