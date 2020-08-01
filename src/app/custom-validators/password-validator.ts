import { FormControl } from '@angular/forms';

export const passwordValidator = (control: FormControl) => {
  try {
    if (control.value.length < 7) {
      return { passwordInvalid: true };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
