import { AbstractControl, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { Constructor } from '../utils/mixins';

export class ChildFormValidator implements Validator {
	public form: FormGroup;

	validate(control: AbstractControl): ValidationErrors {
		return this.form.valid ? null : { invalidForm: { valid: false, message: 'Form is invalid' } };
	}
}

// Mixin Function
export function WithChildFormValidator<T extends Constructor<{}>>(Base: T = class {} as any) {
	return class extends Base implements Validator {
		public form: FormGroup;

		constructor(...args: any[]) {
			super(...args);
		}

		validate(control: AbstractControl): ValidationErrors {
			return this.form.valid ? null : { invalidForm: { valid: false, message: 'Form is invalid' } };
		}
	};
}
