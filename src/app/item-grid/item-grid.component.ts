import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item, player, weapon, ship } from '../items';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent {
  items: Item[] | null = null;

  constructor(private router: Router) {
    this.setItems(router.url)
  }

  setItems(pageIdentifier: any) {
    switch(pageIdentifier) {
      case "/player-cosmetics": {
        this.items = player;
        break;
      }
      case "/weapon-cosmetics": {
        this.items = weapon;
        break;
      }
      case "/ship-cosmetics": {
        this.items = ship;
        break;
      }
    }
  }
}
