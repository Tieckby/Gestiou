import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

//Service
import { ServiceProjectService } from '../MyServices/service-project.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public emailPassword: FormGroup

  constructor(private formBuilder: FormBuilder,
    private myService: ServiceProjectService, private auth: AngularFireAuth,
    private router: Router)
  {
    this.auth.authState.subscribe(
      result => {
        if(result)
        {
          this.router.navigate(['home'])
        }
      }
    )

    this.emailPassword = this.formBuilder.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  //Method which verify user's data(email and password)
  verifyEmailPass()
  {
    this.myService.logIn(this.emailPassword.value.userEmail, this.emailPassword.value.userPassword)
    this.emailPassword.reset() //Init all form input
  }

}
