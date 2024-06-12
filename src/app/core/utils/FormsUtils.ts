import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map } from "rxjs";
import { ProductsService } from '../../products/services/products.service';

export const getControl = (formControlName: string, formGroup: FormGroup): FormControl|null => {
    return formGroup.get(formControlName) as FormControl;
}

export const DevsuFormValidators = {
    todayOrAfter: (control: AbstractControl): ValidationErrors| null => {
        if(!control?.value) return null;
        
        let dateToCompare: Date = new Date();
        let date = control.value;
        let [year, month, day] = date.split('-').map((value: string) => parseInt(value));
        
        let yearToCompare: number = dateToCompare.getFullYear();
        let monthToCompare: number = dateToCompare.getMonth() + 1;
        let dayToCompare: number = dateToCompare.getDate();

        if(year < yearToCompare) return { isBefore: true };
        if(year == yearToCompare && month < monthToCompare) return { isBefore: true };
        if(year == yearToCompare && month == monthToCompare && day < dayToCompare) return { isBefore: true };
        
        return null;
    },
    uniqueID: (productsService: ProductsService): AsyncValidatorFn => {
        return (control: AbstractControl): Observable<ValidationErrors|null> => {
            return productsService.checkByID(control.value)
                .pipe(
                    map((result: boolean) => result ? { idTaken: true } : null)
                );
        }
    }
};