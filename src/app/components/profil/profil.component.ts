import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {

  constructor(public auth: Auth) {
  }
}
