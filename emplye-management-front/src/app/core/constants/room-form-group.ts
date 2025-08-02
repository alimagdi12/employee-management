import { FormControl, FormGroup } from "@angular/forms";

export interface RoomFormGroup extends FormGroup {
  controls: {
    adult: FormControl<number>;
    child: FormControl<number>;
    childGroup: FormControl<number[]>;
  };
}
