import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellAuthComponent } from './shell-auth.component';

describe('ShellAuthComponent', () => {
    let component: ShellAuthComponent;
    let fixture: ComponentFixture<ShellAuthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShellAuthComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
