import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { RendererComponent } from './renderer/renderer.component';

const routes: Routes = [
  { path: 'player-cosmetics', component: ItemGridComponent },
  { path: 'weapon-cosmetics', component: ItemGridComponent },
  { path: 'ship-cosmetics', component: ItemGridComponent },
  { path: 'renderer', component: RendererComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
