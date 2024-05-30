import { Directive, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constructor } from '../utils/mixins';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ChildFormControlValueAccessor<T>
  implements ControlValueAccessor, OnDestroy {
  public form: FormGroup;
  protected notify: any;
  private valueChangesSub: Subscription;

  // Function to call when the input is touched.
  onTouched = () => { };

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(val: T): void {
    if (val) {
      this.form.setValue(val, { emitEvent: false });
    }
  }
  // Allows Angular to register a function to call when the model changes.
  // Subscribes to the form valueChanges observable to call the function on each changes.
  registerOnChange(fn: any): void {
    this.notify = fn;
    this.valueChangesSub = this.form.valueChanges.pipe(tap(() => fn(this.form.value))).subscribe();
  }
  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnDestroy(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }
}

export function WithChildFormControlValueAccessor<T extends Constructor<{}>>(
  Base: T = class { } as any,
) {
  return class extends Base implements ControlValueAccessor, OnDestroy {
    public form: FormGroup;
    private valueChangesSub: Subscription;

    // Function to call when the input is touched.
    onTouched = () => { };

    // Allows Angular to update the model.
    // Update the model and changes needed for the view here.
    writeValue(val: T): void {
      if (val) {
        this.form.setValue(val, { emitEvent: false });
      }
    }
    // Allows Angular to register a function to call when the model changes.
    // Subscribes to the form valueChanges observable to call the function on each changes.
    registerOnChange(fn: any): void {
      this.valueChangesSub = this.form.valueChanges.subscribe(fn);
    }
    // Allows Angular to register a function to call when the model changes.
    // Save the function as a property to call later here.
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
    // Allows Angular to register a function to call when the model changes.
    // Save the function as a property to call later here.
    setDisabledState?(isDisabled: boolean): void {
      isDisabled ? this.form.disable() : this.form.enable();
    }

    ngOnDestroy(): void {
      this.valueChangesSub.unsubscribe();
    }
  };
}
