import { FormControl, AbstractControl } from '@angular/forms';

/**
 *  Return boolean on if password and repeatPassword are equal.
 *
 * @param password          Password controll
 * @param repeatPassword    RepeatPassword controll
 */
export const isPasswordAndRepeatPasswordAreEqual = (
  password: AbstractControl,
  repeatPassword: AbstractControl
) => {
  if (password.value === repeatPassword.value) {
    return true;
  } else {
    return false;
  }
};
