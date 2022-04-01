import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPageRoutingModule } from './detalhes-routing.module';

import { DetalhesPage } from './detalhes.page';
import { DetalhesCryptoComponent } from 'src/app/shared/components/detalhes-crypto/detalhes-crypto.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetalhesPageRoutingModule],
  declarations: [DetalhesPage, DetalhesCryptoComponent],
})
export class DetalhesPageModule {}
