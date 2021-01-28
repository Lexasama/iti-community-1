import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {UserQueries} from '../../services/user.queries';
import {NzMessageService} from 'ng-zorro-antd/message';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();
  requiredField = 'Ce champ est obligatoire';

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries: UserQueries,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async usernameTest(){
    if (await this.userQueries.exists(this.model.username)) {
      this.nzMessageService.error('Ce username exsiste déjà');
    }
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid ) {
      this.nzMessageService.error('Une erreur est survenue. Veuillez réessayer plus tard');
      return;
    }
    if ( this.model.password !== this.model.confirmPassword){
      this.nzMessageService.error('Les mots de passe ne corespondent pas');
      return;
    }
    // TODO Enregistrer l'utilisateur via le UserService
    await this.userService.register(this.model.username, this.model.password);
    await this.goToLogin();
  }

  async goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    await this.router.navigate(['/splash/login']);
  }
}
