import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VowService } from '../service/vow.service';
import { NotificationService } from '../service/notification.service'
import { environment } from 'src/environments/environment';
import { VowSharedService} from '../service/vow-shared.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;



  constructor(public vowService: VowService, private router: Router, private notification: NotificationService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private vowShareService: VowSharedService,private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      email: [''],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      mobileno: ['']
    });
  }

  VowloginSubmit(){

  }

}
