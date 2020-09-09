import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
import { AppServiceService } from './app-service.service';
import defaultcallmockdata from 'src/assets/demo/dummydefault-service.json';
import launchcallmockdata from 'src/assets/demo/dummylaunch-service.json';
import landcallmockdata from 'src/assets/demo/dummyland-service.json';
import yearfiltermockdata from 'src/assets/demo/dummyyearfilter-service.json'
import { By } from '@angular/platform-browser';


export class mockdummy {
  defaultCall(): Observable<any> {
    return of(defaultcallmockdata);
  }

  launchCall() {
    return of(launchcallmockdata);
  }

  landCall() {
    return of(landcallmockdata);
  }

  yearLaunchCall(year) {
    return of(yearfiltermockdata);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let service: AppServiceService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule

      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AppServiceService,
          useClass: mockdummy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance;
    service = TestBed.get(AppServiceService)
    fixture.detectChanges();
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should', async(() => {
    spyOn(component, 'selBtn');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.selBtn).toHaveBeenCalled();
    });
  }));

  it('should', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'launchSuccessBtn');
    let btn = document.getElementById('launchTruebtnid')
    btn.click();
    tick();
    fixture.detectChanges();
    expect(component.launchSuccessBtn).toHaveBeenCalled();
  }));


  it('should', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'launchSuccessBtn');
    let btn = document.getElementById('launchFalsebtnid')
    btn.click();
    tick();
    fixture.detectChanges();
    expect(component.launchSuccessBtn).toHaveBeenCalled();
  }));

  it('should', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'landSuccessBtn');
    let btn = document.getElementById('landSuccessTrueBtnid')
    btn.click();
    tick();
    fixture.detectChanges();
    expect(component.landSuccessBtn).toHaveBeenCalled();
  }));

  it('should', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'landSuccessBtn');
    let btn = document.getElementById('landSuccessFalseBtnid')
    btn.click();
    tick();
    fixture.detectChanges();
    expect(component.landSuccessBtn).toHaveBeenCalled();
  }));



  it('should', fakeAsync(() => {
    const test = spyOn(service, 'defaultCall').and.returnValues(of([1, 2, 3]));
    component.ngOnInit()
    tick();
    fixture.whenStable().then(() => {
      expect(test).toHaveBeenCalled();
    });
  }));

  it('should', fakeAsync(() => {
    const test = spyOn(service, 'landCall').and.returnValues(of([1, 2, 3]));
    component.landSuccessBtn('true')
    tick();
    fixture.whenStable().then(() => {
      expect(test).toHaveBeenCalled();
    });
  }));

  it('should', fakeAsync(() => {
    const test = spyOn(service, 'launchCall').and.returnValues(of([1, 2, 3, 4]));
    component.launchSuccessBtn('true')
    tick();
    fixture.whenStable().then(() => {
      expect(test).toHaveBeenCalled();
    });
  }));

  it('should', fakeAsync(() => {
    const test = spyOn(service, 'yearLaunchCall').and.returnValues(of([1, 2, 3]));
    component.selBtn(2018)
    tick();
    fixture.whenStable().then(() => {
      expect(test).toHaveBeenCalled();
    });
  }));
});
