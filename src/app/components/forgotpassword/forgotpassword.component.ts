import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordService } from 'src/app/core/services/forgotpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpasswordService:ForgotpasswordService,private _Router:Router){}
step1:boolean=true;
step2:boolean=false;
step3:boolean=false;
email:string='';
userMsg:string='';

forgotForm:FormGroup=new FormGroup({
  email: new FormControl('')
})
resetCodForm:FormGroup=new FormGroup({
  resetCode: new FormControl('')
})
resetPassword:FormGroup=new FormGroup({
  newPassword: new FormControl('')
})
forgotpassword():void{
let userEmail=this.forgotForm.value;
this.email=userEmail.email
this._ForgotpasswordService.forgotPassword(userEmail).subscribe({
  next:(res)=>{
    console.log(res)
    this.userMsg=res.massage
    this.step1=false;
    this.step2=true;

  },
  error:(err)=>{
    this.userMsg=err.massage
  }
})

}
resetCode():void{
let resetCode=this.resetCodForm.value;
this._ForgotpasswordService.resetCode(resetCode).subscribe({
  next:(res)=>{
    console.log(res)
    this.userMsg=res.status
    this.step2=false;
    this.step3=true;
  },
  error:(err)=>{
    this.userMsg=err.massage
  }
})
}
newPassword():void{
  let resetForm=this.resetPassword.value;
  resetForm.email=this.email
  this._ForgotpasswordService.resetPassword(resetForm).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.token){
        localStorage.setItem('etoken',res.token)
        this._Router.navigate(['/home'])
      }

    },
    error:(err)=>{
      this.userMsg=err.massage
    }
  })

}
}
