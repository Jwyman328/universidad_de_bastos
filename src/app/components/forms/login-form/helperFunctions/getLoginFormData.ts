import { FormGroup } from '@angular/forms';
import { userNamePasswordModel } from '../../../models/authModels/userNamePasswordModel';

/**
 * Return Login Form json data object containing the entered email and password.
 * @param loginForm Login Form
 */
export function getLoginFormData(loginForm: FormGroup) {
  let loginPostData:userNamePasswordModel = {
    username: loginForm.get('email').value,
    password: loginForm.get('password').value,
  };
  return loginPostData;
}
