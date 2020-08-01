import { FormGroup } from '@angular/forms';
import { userNamePasswordModel } from '../../../models/authModels/userNamePasswordModel';

/**
 * Return Login Form json data object containing the entered email and password.
 * @param loginForm Login Form
 */
export function getSignUpFormData(signUpForm: FormGroup) {
  let signUpPostData:userNamePasswordModel = {
    username: signUpForm.get('email').value,
    password: signUpForm.get('password').value,
  };
  return signUpPostData;
}
