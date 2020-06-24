import {
  Directive,
  HostBinding,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const a = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    this.isOpen = a;
  }

  constructor(private elRef: ElementRef) {}
}
