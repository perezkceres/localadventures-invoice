import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellGuestComponent } from './shell-guest.component';

describe('ShellGuestComponent', () => {
    let component: ShellGuestComponent;
    let fixture: ComponentFixture<ShellGuestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShellGuestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellGuestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
