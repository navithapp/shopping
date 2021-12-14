import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive( {
    selector: '[appDropdown]'
} ) 

export class DropdownDirective {

    @HostBinding('class.open') open =false;

    constructor(private elRef: ElementRef) {}

    @HostListener('document:click', ['$event']) onClick(event:Event) {
        // console.log(event.target);
        this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
    }
}