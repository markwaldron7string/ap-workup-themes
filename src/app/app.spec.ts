import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App } from './app';

function installStorageMock(): void {
  const storage = new Map<string, string>();

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
      clear: () => storage.clear(),
    },
  });
}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    installStorageMock();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('renders both calculator headings', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('YEARS LICENSED CALCULATOR');
    expect(compiled.textContent).toContain('PREMIUM WORKUP CALCULATOR');
  });

  it('enables premium calculation only when both premium values are parsed', () => {
    expect(component.premiumReady).toBe(false);

    component.parsedOldPrem = 1000;
    expect(component.premiumReady).toBe(false);

    component.parsedNewPrem = 1200;
    expect(component.premiumReady).toBe(true);
  });

  it('calculates a premium increase percentage', () => {
    component.parsedOldPrem = 1000;
    component.parsedNewPrem = 1125;

    component.calculatePremium();

    expect(component.premResult?.title).toBe('Premium increase');
    expect(component.premResult?.premiumPct).toBe('+12.5%');
    expect(component.premResult?.premiumClass).toBe('increase');
  });

  it('clears premium values and result state', () => {
    component.premOldInput = '1,000.00';
    component.premNewInput = '1,125.00';
    component.premFeeInput = '25.00';
    component.parsedOldPrem = 1000;
    component.parsedNewPrem = 1125;
    component.fixedFees = [25];
    component.calculatePremium();

    component.clearPremium();

    expect(component.premOldInput).toBe('');
    expect(component.premNewInput).toBe('');
    expect(component.premFeeInput).toBe('');
    expect(component.parsedOldPrem).toBeNull();
    expect(component.parsedNewPrem).toBeNull();
    expect(component.fixedFees).toEqual([]);
    expect(component.premResult).toBeNull();
  });
});
