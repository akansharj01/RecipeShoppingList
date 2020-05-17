import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownListDirective]'
})
export class DropdownListDirectiveDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    console.log('isOpen : ' + this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
