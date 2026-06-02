import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

type Theme = 'dark' | 'light';
type Tone = 'success' | 'warn' | 'danger';

interface StateRule {
  pM: number;
  lM: number;
  pL: string;
  lL: string;
}

interface Diff {
  years: number;
  months: number;
  days: number;
}

interface ResultModel {
  tone: Tone;
  icon: 'check' | 'warn' | 'x' | 'up' | 'down' | 'flat';
  title: string;
  bodyHtml?: string;
  tileNum?: number;
  tileLabel?: string;
  badge?: string;
  meta?: string;
  extraMeta?: string;
  premiumPct?: string;
  premiumClass?: 'increase' | 'decrease' | 'flat';
}

const STATE_DATA: Record<string, StateRule> = {
  MA: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  NC: { pM: 180, lM: 192, pL: '15', lL: '16' },
  CA: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  NJ: { pM: 192, lM: 204, pL: '16', lL: '17' },
  DC: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  AL: { pM: 180, lM: 192, pL: '15', lL: '16' },
  AK: { pM: 168, lM: 192, pL: '14', lL: '16' },
  AZ: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  AR: { pM: 168, lM: 192, pL: '14', lL: '16' },
  CO: { pM: 180, lM: 192, pL: '15', lL: '16' },
  CT: { pM: 192, lM: 196, pL: '16', lL: '16y4m' },
  DE: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  FL: { pM: 180, lM: 192, pL: '15', lL: '16' },
  GA: { pM: 180, lM: 192, pL: '15', lL: '16' },
  HI: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  ID: { pM: 174, lM: 180, pL: '14½', lL: '15' },
  IL: { pM: 180, lM: 192, pL: '15', lL: '16' },
  IN: { pM: 180, lM: 192, pL: '15', lL: '16' },
  IA: { pM: 168, lM: 192, pL: '14', lL: '16' },
  KS: { pM: 168, lM: 192, pL: '14', lL: '16' },
  KY: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  LA: { pM: 180, lM: 204, pL: '15', lL: '17' },
  ME: { pM: 180, lM: 192, pL: '15', lL: '16' },
  MD: { pM: 189, lM: 198, pL: '15y9m', lL: '16½' },
  MI: { pM: 177, lM: 192, pL: '14y9m', lL: '16' },
  MN: { pM: 180, lM: 192, pL: '15', lL: '16' },
  MS: { pM: 180, lM: 180, pL: '15', lL: '15' },
  MO: { pM: 180, lM: 192, pL: '15', lL: '16' },
  MT: { pM: 174, lM: 192, pL: '14½', lL: '16' },
  NE: { pM: 180, lM: 192, pL: '15', lL: '16' },
  NV: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  NH: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  NM: { pM: 180, lM: 186, pL: '15', lL: '15½' },
  NY: { pM: 192, lM: 204, pL: '16', lL: '17' },
  ND: { pM: 168, lM: 192, pL: '14', lL: '16' },
  OH: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  OK: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  OR: { pM: 180, lM: 192, pL: '15', lL: '16' },
  PA: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  RI: { pM: 192, lM: 198, pL: '16', lL: '16½' },
  SC: { pM: 180, lM: 186, pL: '15', lL: '15½' },
  SD: { pM: 168, lM: 174, pL: '14', lL: '14½' },
  TN: { pM: 180, lM: 192, pL: '15', lL: '16' },
  TX: { pM: 180, lM: 192, pL: '15', lL: '16' },
  UT: { pM: 180, lM: 192, pL: '15', lL: '16' },
  VT: { pM: 180, lM: 192, pL: '15', lL: '16' },
  VA: { pM: 186, lM: 195, pL: '15½', lL: '16y3m' },
  WA: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  WV: { pM: 180, lM: 192, pL: '15', lL: '16' },
  WI: { pM: 186, lM: 192, pL: '15½', lL: '16' },
  WY: { pM: 180, lM: 192, pL: '15', lL: '16' },
};

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'Washington, D.C.',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NM: 'New Mexico',
  NY: 'New York',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const EXACT_STATES = ['MA', 'NC', 'CA'];
const MVR_STATES = ['NC', 'RI', 'TX'];

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  theme: Theme = 'dark';

  stateData = STATE_DATA;
  exactStates = EXACT_STATES;
  otherStates = Object.keys(STATE_NAMES)
    .sort((a, b) => STATE_NAMES[a].localeCompare(STATE_NAMES[b]))
    .map((code) => ({ code, name: STATE_NAMES[code] }));

  selectedState = '';
  primaryDateInput = '';
  workupInput = '';
  ageInput = '';
  parsedDob: Date | null = null;
  parsedWorkup: Date | null = null;
  parsedIssueDate: Date | null = null;
  expMvrEnabled = false;
  expAgeEnabled = false;
  expAgeValue: number | null = null;
  storedDobValue = '';
  storedParsedDob: Date | null = null;
  yearsResult: ResultModel | null = null;

  premOldInput = '';
  premNewInput = '';
  premFeeInput = '';
  parsedOldPrem: number | null = null;
  parsedNewPrem: number | null = null;
  fixedFees: number[] = [];
  premResult: ResultModel | null = null;

  constructor() {
    const savedTheme = (localStorage.getItem('calcTheme') as Theme | null) || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calcTheme', theme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  stateName(code: string): string {
    if (code === 'MA') return 'Massachusetts';
    if (code === 'NC') return 'North Carolina';
    if (code === 'CA') return 'California';
    if (code === 'NJ') return 'New Jersey';
    if (code === 'DC') return 'Washington, D.C.';
    return STATE_NAMES[code] || '';
  }

  get selectedRule(): StateRule | null {
    return this.selectedState ? STATE_DATA[this.selectedState] : null;
  }

  get isExactState(): boolean {
    return EXACT_STATES.includes(this.selectedState);
  }

  get isNj(): boolean {
    return this.selectedState === 'NJ';
  }

  get canShowMvr(): boolean {
    return MVR_STATES.includes(this.selectedState);
  }

  get modeLabel(): string {
    if (this.isExactState) return 'Exact calculation';
    if (this.isNj) return 'Months licensed (NJ)';
    return 'Range output';
  }

  get primaryDateLabel(): string {
    return this.expMvrEnabled ? 'Original DL Issue Date' : "Driver's Date of Birth";
  }

  get yearsReady(): boolean {
    const primaryOk = this.expMvrEnabled ? !!this.parsedIssueDate : !!this.parsedDob;
    return (
      !!this.selectedState &&
      primaryOk &&
      !!this.parsedWorkup &&
      (!this.expMvrEnabled || !!this.parsedIssueDate) &&
      (!this.expAgeEnabled || this.expAgeValue !== null)
    );
  }

  onStateChange(code: string): void {
    this.selectedState = code;
    this.yearsResult = null;
    this.updateExpPanels();
  }

  updateExpPanels(): void {
    if (this.canShowMvr) return;
    if (this.expMvrEnabled) this.restoreDobMode();
    this.expMvrEnabled = false;
    this.expAgeEnabled = false;
    this.expAgeValue = null;
    this.ageInput = '';
    this.parsedIssueDate = null;
  }

  onPrimaryDateInput(value: string): void {
    this.primaryDateInput = this.autoSlash(value);
    this.yearsResult = null;
    const parsed = this.primaryDateInput.length === 10 ? this.parseDate(this.primaryDateInput) : null;
    if (this.expMvrEnabled) this.parsedIssueDate = parsed;
    else this.parsedDob = parsed;
  }

  applyPrimaryDateInput(): void {
    this.applyDateValue(this.primaryDateInput, (value, parsed) => {
      this.primaryDateInput = value;
      if (this.expMvrEnabled) this.parsedIssueDate = parsed;
      else this.parsedDob = parsed;
    });
  }

  onWorkupInput(value: string): void {
    this.workupInput = this.autoSlash(value);
    this.yearsResult = null;
    this.parsedWorkup = this.workupInput.length === 10 ? this.parseDate(this.workupInput) : null;
  }

  applyWorkupInput(): void {
    this.applyDateValue(this.workupInput, (value, parsed) => {
      this.workupInput = value;
      this.parsedWorkup = parsed;
    });
  }

  applyDateValue(value: string, setter: (value: string, parsed: Date | null) => void): void {
    const trimmed = value.trim();
    if (!trimmed) {
      setter('', null);
      return;
    }
    const parsed = this.parseDate(trimmed);
    setter(parsed ? this.formatDisplay(parsed) : trimmed, parsed);
  }

  toggleMvr(checked: boolean): void {
    if (checked) {
      if (this.expAgeEnabled) {
        this.expAgeEnabled = false;
        this.expAgeValue = null;
        this.ageInput = '';
      }
      this.expMvrEnabled = true;
      this.enableIssueDateMode();
    } else {
      this.expMvrEnabled = false;
      this.restoreDobMode();
    }
    this.yearsResult = null;
  }

  toggleAge(checked: boolean): void {
    if (checked) {
      if (this.expMvrEnabled) {
        this.expMvrEnabled = false;
        this.restoreDobMode();
      }
      this.expAgeEnabled = true;
    } else {
      this.expAgeEnabled = false;
      this.expAgeValue = null;
      this.ageInput = '';
    }
    this.yearsResult = null;
  }

  enableIssueDateMode(): void {
    this.storedDobValue = this.primaryDateInput;
    this.storedParsedDob = this.parsedDob;
    this.primaryDateInput = '';
    this.parsedDob = null;
    this.parsedIssueDate = null;
  }

  restoreDobMode(): void {
    this.primaryDateInput = this.storedDobValue;
    this.parsedDob = this.storedParsedDob;
    this.parsedIssueDate = null;
  }

  onAgeInput(value: string): void {
    this.ageInput = value;
    const parsed = parseFloat(value.trim());
    this.expAgeValue = !isNaN(parsed) && parsed > 0 && parsed < 100 ? parsed : null;
    this.yearsResult = null;
  }

  clearYears(): void {
    this.selectedState = '';
    this.primaryDateInput = '';
    this.workupInput = '';
    this.ageInput = '';
    this.parsedDob = null;
    this.parsedWorkup = null;
    this.parsedIssueDate = null;
    this.expMvrEnabled = false;
    this.expAgeEnabled = false;
    this.expAgeValue = null;
    this.storedDobValue = '';
    this.storedParsedDob = null;
    this.yearsResult = null;
  }

  calculateYears(): void {
    if (!this.yearsReady || !this.selectedRule || !this.parsedWorkup) return;
    const code = this.selectedState;
    const cfg = this.selectedRule;
    const workup = this.parsedWorkup;

    if (this.expMvrEnabled && this.parsedIssueDate) {
      if (workup < this.parsedIssueDate) {
        this.yearsResult = {
          tone: 'danger',
          icon: 'x',
          title: 'Workup date is before the issue date',
          bodyHtml: `The workup date (${this.fmtDate(workup)}) falls before the original DL issue date (${this.fmtDate(this.parsedIssueDate)}). Please verify both dates.`,
        };
      } else {
        this.yearsResult = this.renderLicensedOutput(
          code,
          this.parsedIssueDate,
          workup,
          'Years licensed',
          `Based on original DL issue date: ${this.fmtDate(this.parsedIssueDate)}`,
        );
      }
      return;
    }

    if (this.expAgeEnabled && this.expAgeValue !== null) {
      if (!this.parsedDob) {
        this.yearsResult = {
          tone: 'warn',
          icon: 'warn',
          title: 'Date of birth required',
          bodyHtml: `Please enter the driver's date of birth. It's needed to calculate years licensed from the reported age of <strong>${this.expAgeValue}</strong>.`,
        };
        return;
      }
      const enteredMonths = Math.round(this.expAgeValue * 12);
      if (enteredMonths < cfg.pM) {
        this.yearsResult = {
          tone: 'danger',
          icon: 'x',
          title: "Not yet eligible for a learner's permit",
          bodyHtml: `The entered age of <strong>${this.expAgeValue}</strong> is below the minimum permit age for ${this.stateName(code)} (age <strong>${cfg.pL}</strong>). Please verify the reported age.`,
        };
      } else if (enteredMonths < cfg.lM) {
        this.yearsResult = {
          tone: 'warn',
          icon: 'warn',
          title: "Learner's permit age only — not yet licensed",
          bodyHtml: `The entered age of <strong>${this.expAgeValue}</strong> falls within the learner's permit range for ${this.stateName(code)}. The minimum license age is <strong>${cfg.lL}</strong>.<br><br>Years licensed cannot be calculated from a permit-only age.`,
        };
      } else {
        const licenseDate = this.addMonths(this.parsedDob, enteredMonths);
        if (workup < licenseDate) {
          this.yearsResult = {
            tone: 'warn',
            icon: 'warn',
            title: 'Not yet licensed as of workup date',
            bodyHtml: `Based on the reported license age of ${this.expAgeValue}, this driver would not have been licensed until ${this.fmtDate(licenseDate)}.<br><br><strong style="color:var(--warn)">License eligible from: ${this.fmtDate(licenseDate)}</strong>`,
          };
        } else {
          this.yearsResult = this.renderLicensedOutput(
            code,
            licenseDate,
            workup,
            'Years licensed',
            `Based on reported first license age: ${this.expAgeValue} · Calculated license date: ${this.fmtDate(licenseDate)}`,
          );
        }
      }
      return;
    }

    const dob = this.parsedDob;
    if (!dob) return;
    if (this.isNj) {
      const bracket = this.getNJBracket(dob, workup);
      const permitDate = this.addMonths(dob, cfg.pM);
      this.yearsResult =
        bracket === null
          ? {
              tone: 'danger',
              icon: 'x',
              title: "Not yet eligible for a learner's permit",
              bodyHtml: `As of the workup date, this driver has not yet reached the minimum permit age in New Jersey (age 16).<br><br><strong style="color:var(--danger)">Permit eligible from: ${this.fmtDate(permitDate)}</strong>`,
            }
          : {
              tone: 'success',
              icon: 'check',
              title: 'Months licensed',
              badge: bracket,
              meta: "Bracket keyed to driver's age at workup date",
            };
      return;
    }

    const licenseDate = this.addMonths(dob, cfg.lM);
    const permitDate = this.addMonths(dob, cfg.pM);
    if (workup >= licenseDate) {
      if (this.isExactState) {
        const diff = this.dateDiff(licenseDate, workup);
        this.yearsResult = {
          tone: 'success',
          icon: 'check',
          title: 'Years licensed',
          tileNum: diff.years,
          tileLabel: diff.years === 1 ? 'year' : 'years',
          meta: `License eligible from ${this.fmtDate(licenseDate)}`,
        };
      } else {
        this.yearsResult = this.renderLicensedOutput(
          code,
          licenseDate,
          workup,
          'Years licensed',
          `License eligible from ${this.fmtDate(licenseDate)}`,
        );
      }
    } else if (workup >= permitDate) {
      this.yearsResult = {
        tone: 'warn',
        icon: 'warn',
        title: "Learner's permit age only — not yet licensed",
        bodyHtml: `As of the workup date, this driver is old enough for a learner's permit in ${this.stateName(code)} but has not yet reached the minimum age for a regular license.<br><br><strong style="color:var(--warn)">Regular license eligible from: ${this.fmtDate(licenseDate)}</strong>`,
      };
    } else {
      this.yearsResult = {
        tone: 'danger',
        icon: 'x',
        title: "Not yet eligible for a learner's permit",
        bodyHtml: `As of the workup date, this driver has not yet reached the minimum age for a learner's permit in ${this.stateName(code)}.<br><br><strong style="color:var(--danger)">Permit eligible from: ${this.fmtDate(permitDate)}</strong>`,
      };
    }
  }

  renderLicensedOutput(code: string, startDate: Date, workup: Date, title: string, meta: string): ResultModel {
    const diff = this.dateDiff(startDate, workup);
    if (code === 'NJ') {
      return {
        tone: 'success',
        icon: 'check',
        title: 'Months licensed',
        badge: this.getNJElapsedRange(diff),
        meta: `${meta} · ${diff.years} yr ${diff.months} mo ${diff.days} d as of workup date`,
      };
    }
    if (EXACT_STATES.includes(code)) {
      return {
        tone: 'success',
        icon: 'check',
        title,
        tileNum: diff.years,
        tileLabel: diff.years === 1 ? 'year' : 'years',
        meta,
      };
    }
    return {
      tone: 'success',
      icon: 'check',
      title,
      badge: this.getRange(diff),
      meta: `${meta} · ${diff.years} yr ${diff.months} mo ${diff.days} d as of workup date`,
    };
  }

  onPremiumInput(kind: 'old' | 'new', value: string): void {
    if (kind === 'old') {
      this.premOldInput = value;
      this.parsedOldPrem = this.parseCurrency(value);
    } else {
      this.premNewInput = value;
      this.parsedNewPrem = this.parseCurrency(value);
    }
    this.premResult = null;
  }

  applyPremiumInput(kind: 'old' | 'new'): void {
    const value = kind === 'old' ? this.premOldInput : this.premNewInput;
    const parsed = this.parseCurrency(value);
    if (kind === 'old') {
      this.parsedOldPrem = parsed;
      this.premOldInput = parsed !== null ? this.fmtCurrency(parsed) : value.trim();
    } else {
      this.parsedNewPrem = parsed;
      this.premNewInput = parsed !== null ? this.fmtCurrency(parsed) : value.trim();
    }
    this.premResult = null;
  }

  onFeeInput(value: string): void {
    this.premFeeInput = value;
    this.premResult = null;
  }

  addFixedFee(): void {
    const fee = this.parseCurrency(this.premFeeInput);
    if (fee === null || this.parsedOldPrem === null || this.parsedNewPrem === null) return;
    const adjustedOld = this.parsedOldPrem - fee;
    const adjustedNew = this.parsedNewPrem - fee;
    if (adjustedOld <= 0 || adjustedNew < 0) {
      this.premResult = {
        tone: 'warn',
        icon: 'warn',
        title: 'Fixed fee exceeds premium',
        bodyHtml: `The fixed fee of <strong>$${this.fmtCurrency(fee)}</strong> would leave an adjusted old premium of <strong>$${this.fmtCurrency(adjustedOld)}</strong> and adjusted new premium of <strong>$${this.fmtCurrency(adjustedNew)}</strong>. Please verify the fee before adding it.`,
      };
      return;
    }
    this.fixedFees.push(fee);
    this.parsedOldPrem = adjustedOld;
    this.parsedNewPrem = adjustedNew;
    this.premOldInput = this.fmtCurrency(adjustedOld);
    this.premNewInput = this.fmtCurrency(adjustedNew);
    this.premFeeInput = '';
    this.premResult = null;
  }

  removeFixedFee(index: number): void {
    const [fee] = this.fixedFees.splice(index, 1);
    if (fee !== undefined && this.parsedOldPrem !== null && this.parsedNewPrem !== null) {
      this.parsedOldPrem += fee;
      this.parsedNewPrem += fee;
      this.premOldInput = this.fmtCurrency(this.parsedOldPrem);
      this.premNewInput = this.fmtCurrency(this.parsedNewPrem);
    }
    this.premResult = null;
  }

  clearPremium(): void {
    this.premOldInput = '';
    this.premNewInput = '';
    this.premFeeInput = '';
    this.parsedOldPrem = null;
    this.parsedNewPrem = null;
    this.fixedFees = [];
    this.premResult = null;
  }

  get premiumReady(): boolean {
    return this.parsedOldPrem !== null && this.parsedNewPrem !== null;
  }

  get fixedFeeTotal(): number {
    return this.fixedFees.reduce((sum, fee) => sum + fee, 0);
  }

  calculatePremium(): void {
    if (!this.premiumReady || this.parsedOldPrem === null || this.parsedNewPrem === null) return;
    const rawPct = (this.parsedNewPrem / this.parsedOldPrem - 1) * 100;
    const pct = Math.round(rawPct * 10) / 10;
    const sign = pct > 0 ? '+' : '';
    const meta = `$${this.fmtCurrency(this.parsedOldPrem)} → $${this.fmtCurrency(this.parsedNewPrem)}`;
    const extraMeta = this.fixedFeeTotal > 0 ? `Fixed fees excluded: $${this.fmtCurrency(this.fixedFeeTotal)}` : undefined;
    if (pct > 0) {
      this.premResult = {
        tone: 'success',
        icon: 'up',
        title: 'Premium increase',
        premiumPct: `${sign}${pct.toFixed(1)}%`,
        premiumClass: 'increase',
        meta,
        extraMeta,
      };
    } else if (pct < 0) {
      this.premResult = {
        tone: 'danger',
        icon: 'down',
        title: 'Premium decrease',
        premiumPct: `${pct.toFixed(1)}%`,
        premiumClass: 'decrease',
        meta,
        extraMeta,
      };
    } else {
      this.premResult = {
        tone: 'success',
        icon: 'flat',
        title: 'No change',
        premiumPct: '0.0%',
        premiumClass: 'flat',
        meta,
        extraMeta,
      };
    }
  }

  parseCurrency(str: string): number | null {
    if (!str || !str.trim()) return null;
    const val = parseFloat(str.replace(/[$,\s]/g, ''));
    return isNaN(val) || val <= 0 ? null : val;
  }

  fmtCurrency(val: number): string {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  parseDate(str: string): Date | null {
    if (!str) return null;
    const trimmed = str.trim();
    let m: string | undefined;
    let d: string | undefined;
    let y: string | undefined;
    let match = trimmed.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
    if (match) [, y, m, d] = match;
    if (!y) {
      match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      if (match) [, m, d, y] = match;
    }
    if (!y) {
      match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2})$/);
      if (match) {
        [, m, d, y] = match;
        y = `${parseInt(y, 10) <= 30 ? '20' : '19'}${y}`;
      }
    }
    if (!y) {
      match = trimmed.match(/^(\d{2})(\d{2})(\d{4})$/);
      if (match) [, m, d, y] = match;
    }
    if (!m || !d || !y) return null;
    const date = new Date(`${y.padStart(4, '0')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T12:00:00`);
    return isNaN(date.getTime()) ? null : date;
  }

  autoSlash(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  formatDisplay(date: Date): string {
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  }

  fmtDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  addMonths(date: Date, months: number): Date {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() !== day) d.setDate(0);
    return d;
  }

  dateDiff(from: Date, to: Date): Diff {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    if (days < 0) {
      months--;
      days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  }

  getRange(diff: Diff): string {
    const m = diff.years * 12 + diff.months;
    if (m < 12) return 'Less than 1 year';
    if (m < 24) return '1 – 2 years';
    if (m < 36) return '2 – 3 years';
    return 'More than 3 years';
  }

  getNJElapsedRange(diff: Diff): string {
    const m = diff.years * 12 + diff.months;
    if (m < 6) return '0 – 6 months';
    if (m < 12) return '7 – 12 months';
    if (m < 18) return '13 – 18 months';
    if (m < 24) return '19 – 24 months';
    if (m < 30) return '25 – 30 months';
    if (m < 36) return '31 – 35 months';
    return 'More than 36 months';
  }

  getNJBracket(dob: Date, workup: Date): string | null {
    const age16 = this.addMonths(dob, 192);
    const age16h = this.addMonths(dob, 198);
    const age17 = this.addMonths(dob, 204);
    const age17h = this.addMonths(dob, 210);
    const age18 = this.addMonths(dob, 216);
    const age18h = this.addMonths(dob, 222);
    const age19 = this.addMonths(dob, 228);
    if (workup < age16) return null;
    if (workup < age16h) return '0 – 6 months';
    if (workup < age17) return '7 – 12 months';
    if (workup < age17h) return '13 – 18 months';
    if (workup < age18) return '19 – 24 months';
    if (workup < age18h) return '25 – 30 months';
    if (workup < age19) return '31 – 35 months';
    return 'More than 36 months';
  }
}
