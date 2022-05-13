import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FitBoundsAccessor } from '@agm/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userForm = this.fb.group({
    
    name: ['', Validators.required],
    email: ['', [Validators.required,Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    phone: ['',[Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{7})')]]
  }); 

  constructor(private router: Router,
    private localStorage: LocalStorageService,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
  }
  navitage(){
    console.log("onsubmit form");
    // console.log(this.userForm.value);
    // this.localStorage.setUser(this.userForm.value)
    this.router.navigate(['/auth/material-widgets/quiz'])
  }
}
