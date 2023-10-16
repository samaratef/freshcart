import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router= Inject(Router)
  if(localStorage.getItem('etoken')!= null){
    return true;
  }
  else{
    _Router.navigate(['/login'])
    return false
  }
};