import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormGroup,FormControl,Validators,FormControlOptions} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService){}
registerForm:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  rePassword:new FormControl(''),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
},{validators:[this.confirmPassword]} as FormControlOptions)
confirmPassword(group:FormGroup):void{
  const password=group.get('password')
  const rePassword=group.get('rePassword')
  if(rePassword?.value==''){
    rePassword?.setErrors({required:true})
  }
  else if(password?.value != rePassword?.value){
    rePassword?.setErrors({misMath:true})
  } 

}
handleForm():void{
  const userData=this.registerForm.value;
  if(this.registerForm.valid===true){
    this._AuthService.register(userData).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err)

      }
      
    })
  }
}
}
