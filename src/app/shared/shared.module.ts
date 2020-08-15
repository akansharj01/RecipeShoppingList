import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner-component';
import { AlertComponent } from './alert/alert-component';
import { DropdownListDirectiveDirective } from '../dropdown-list-directive.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownListDirectiveDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownListDirectiveDirective 
    ]
})
export class SharedModule {

}