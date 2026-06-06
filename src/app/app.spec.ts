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

  it('aligns previously divergent state ages with the AP guideline table', () => {
    const guidelineRules = [
      ['CT', { pM: 192, lM: 192, pL: '16', lL: '16' }],
      ['DE', { pM: 190, lM: 192, pL: '15y10m', lL: '16' }],
      ['DC', { pM: 192, lM: 192, pL: '16', lL: '16' }],
      ['HI', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['ID', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['KY', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['LA', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['MD', { pM: 189, lM: 192, pL: '15y9m', lL: '16' }],
      ['MS', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['MT', { pM: 174, lM: 180, pL: '14½', lL: '15' }],
      ['NM', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['NY', { pM: 192, lM: 192, pL: '16', lL: '16' }],
      ['RI', { pM: 192, lM: 192, pL: '16', lL: '16' }],
      ['SC', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['SD', { pM: 168, lM: 192, pL: '14', lL: '16' }],
      ['WA', { pM: 180, lM: 192, pL: '15', lL: '16' }],
      ['WI', { pM: 180, lM: 192, pL: '15', lL: '16' }],
    ] as const;

    for (const [state, expected] of guidelineRules) {
      expect(component.stateData[state]).toEqual(expected);
    }
  });

  it('uses the guideline permit age when checking Hawaii eligibility', () => {
    component.selectedState = 'HI';
    component.parsedDob = new Date(2010, 0, 1);
    component.parsedWorkup = new Date(2025, 1, 1);

    component.calculateYears();

    expect(component.yearsResult?.title).toBe("Learner's permit age only — not yet licensed");
  });

  it('uses the guideline license age when checking New York eligibility', () => {
    component.selectedState = 'NY';
    component.parsedDob = new Date(2009, 0, 1);
    component.parsedWorkup = new Date(2025, 1, 1);

    component.calculateYears();

    expect(component.yearsResult?.title).toBe('Years licensed');
  });

  it('does not treat South Dakota restricted-minor age as regular license age', () => {
    component.selectedState = 'SD';
    component.parsedDob = new Date(2010, 0, 1);
    component.parsedWorkup = new Date(2024, 6, 2);

    component.calculateYears();

    expect(component.yearsResult?.title).toBe("Learner's permit age only — not yet licensed");
  });

  it('shows the original issue date override by default without a state selected', () => {
    fixture.detectChanges();

    expect(component.canShowIssueDateOverride).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Original DL Issue Date');
  });

  it('calculates years licensed from original issue date for a formerly excluded state', () => {
    component.selectedState = 'AL';
    component.expMvrEnabled = true;
    component.parsedIssueDate = new Date(2020, 0, 1);
    component.parsedWorkup = new Date(2025, 0, 1);

    component.calculateYears();

    expect(component.yearsResult?.title).toBe('Years licensed');
    expect(component.yearsResult?.meta).toContain('Based on original DL issue date: January 1, 2020');
  });

  it('prepares range years clipboard text without the year label', () => {
    component.selectedState = 'TX';
    component.parsedDob = new Date(2000, 0, 1);
    component.parsedWorkup = new Date(2017, 6, 1);

    component.calculateYears();

    expect(component.yearsResult?.badge).toBe('1 – 2 years');
    expect(component.yearsResult?.copyText).toBe('1-2');
  });

  it('prepares exact years clipboard text as only the numeric value', () => {
    component.selectedState = 'MA';
    component.parsedDob = new Date(1990, 0, 1);
    component.parsedWorkup = new Date(2024, 0, 1);

    component.calculateYears();

    expect(component.yearsResult?.tileNum).toBe(17);
    expect(component.yearsResult?.copyText).toBe('17');
  });

  it('prepares New Jersey clipboard text with the month bracket intact', () => {
    component.selectedState = 'NJ';
    component.parsedDob = new Date(2000, 0, 1);
    component.parsedWorkup = new Date(2017, 2, 1);

    component.calculateYears();

    expect(component.yearsResult?.badge).toBe('13 – 18 months');
    expect(component.yearsResult?.copyText).toBe('13-18 months');
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

  it('prepares premium clipboard text as labeled rows', () => {
    component.parsedOldPrem = 100;
    component.parsedNewPrem = 200;

    component.calculatePremium();

    expect(component.premResult?.copyText).toBe('Old premium: $100\nNew premium: $200\n% difference: 100%');
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
