import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemGridComponent } from './item-grid/item-grid.component';

const routes: Routes = [
  { path: 'player-cosmetics', component: ItemGridComponent },
  { path: 'weapon-cosmetics', component: ItemGridComponent },
  { path: 'ship-cosmetics', component: ItemGridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
