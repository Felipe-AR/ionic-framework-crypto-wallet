import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-detalhes-crypto',
  templateUrl: './detalhes-crypto.component.html',
  styleUrls: ['./detalhes-crypto.component.scss'],
})
export class DetalhesCryptoComponent implements OnInit {
  @Input() cryptoCurrency: any;
  @Output() removeCryptoEvent = new EventEmitter<any>();

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {}

  removeCrypto(cryptoCurrencyId: string) {
    this.removeCryptoEvent.emit(cryptoCurrencyId);
  }
}
