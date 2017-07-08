import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  moduleId: module.id,
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {

  constructor(public auth: Auth, private app: AppComponent) {
    if (document.getElementById("menu").classList.contains("mobile-menu")) {
      app.mobileMenu('close')
    }
  }
}
