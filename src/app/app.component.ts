import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { NavController } from '@ionic/angular';
import { SessionVaultService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private navController: NavController, private vault: SessionVaultService) {}

  ngOnInit(): void {
    this.vault.locked.subscribe((lock: boolean) => {
      if (lock) {
        this.navController.navigateRoot(['/', 'unlock']);
      }
    });

    Device.setHideScreenOnBackground(true);
  }
}
