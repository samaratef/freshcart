import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormGroup,FormControl,Validators,FormControlOptions} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService){}
loginForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
})

handleForm():void{
  const userData=this.loginForm.value;
  if(this.loginForm.valid===true){
    this._AuthService.login(userData).subscribe({
      next:(res)=>{
        if(res.massage=='success'){
          console.log(res);
          localStorage.setItem('etoken',res.token);
          this._AuthService.decodeUser();

        }
      },
      error:(err)=>{
        console.log(err)

      }
      
    })
  }
}
}
