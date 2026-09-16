import alumniData from '@/data/alumniSeason2.json';

export interface AlumniRecord {
  id: number;
  studentName: string;
  husbandName: string;
  fatherName: string;
  guardianName: string;
}

export interface AlumniVerificationResult {
  verified: boolean;
  message: string;
  matchedRecord?: AlumniRecord;
  matchType?: 'husband' | 'father' | 'no_guardian_recorded' | 'exact' | 'fuzzy';
}

function clean(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\b(mr|mrs|ms|smt|shri|shree|dr|ji|late|smt\.|kumar|singh|devi)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const d: number[][] = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[m][n];
}

function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

function isGivenNameMatch(inName: string, recName: string): boolean {
  const cIn = clean(inName);
  const cRec = clean(recName);
  if (!cIn || !cRec) return false;

  // Full clean match
  if (cIn === cRec || similarity(cIn, cRec) >= 0.8) return true;

  const inTokens = cIn.split(' ').filter(Boolean);
  const recTokens = cRec.split(' ').filter(Boolean);

  if (inTokens.length === 0 || recTokens.length === 0) return false;

  const inFirst = inTokens[0];
  const recFirst = recTokens[0];

  // First name match
  if (inFirst === recFirst || similarity(inFirst, recFirst) >= 0.8) {
    // If user provided surname, and record has surname, check if surnames are not contradictory
    if (inTokens.length > 1 && recTokens.length > 1) {
      const inLast = inTokens[inTokens.length - 1];
      const recLast = recTokens[recTokens.length - 1];
      if (inLast === recLast || similarity(inLast, recLast) >= 0.75) {
        return true;
      }
      return false;
    }
    return true;
  }

  return false;
}

function isGuardianMatch(
  inGuardian: string,
  recHusband: string,
  recFather: string
): { isMatch: boolean; matchedField?: 'husband' | 'father' } {
  const cIn = clean(inGuardian);
  if (!cIn) return { isMatch: false };

  const check = (recTarget: string): boolean => {
    const cRec = clean(recTarget);
    if (!cRec) return false;
    if (cIn === cRec || cRec.includes(cIn) || cIn.includes(cRec)) return true;

    const inTokens = cIn.split(' ').filter(Boolean);
    const recTokens = cRec.split(' ').filter(Boolean);

    if (inTokens.length === 0 || recTokens.length === 0) return false;

    const inFirst = inTokens[0];
    const recFirst = recTokens[0];

    if (inFirst === recFirst || similarity(inFirst, recFirst) >= 0.8) {
      if (inTokens.length > 1 && recTokens.length > 1) {
        const inLast = inTokens[inTokens.length - 1];
        const recLast = recTokens[recTokens.length - 1];
        if (inLast === recLast || similarity(inLast, recLast) >= 0.75) {
          return true;
        }
        return false;
      }
      return true;
    }

    return false;
  };

  if (recHusband && check(recHusband)) {
    return { isMatch: true, matchedField: 'husband' };
  }
  if (recFather && check(recFather)) {
    return { isMatch: true, matchedField: 'father' };
  }

  return { isMatch: false };
}

/**
 * Verifies if the provided student name and father/husband name match Season 2 records.
 */
export function verifyAlumni(
  studentInput: string,
  guardianInput: string = ''
): AlumniVerificationResult {
  const cStudent = clean(studentInput);
  const cGuardian = clean(guardianInput);

  if (!cStudent || cStudent.length < 2) {
    return {
      verified: false,
      message: 'Please enter a valid participant name to verify Season 2 alumni status.',
    };
  }

  const alumniList = alumniData as AlumniRecord[];

  for (const record of alumniList) {
    if (isGivenNameMatch(studentInput, record.studentName)) {
      if (cGuardian) {
        const guardMatch = isGuardianMatch(
          guardianInput,
          record.husbandName,
          record.fatherName
        );
        if (guardMatch.isMatch) {
          const guardianDetail =
            guardMatch.matchedField === 'husband'
              ? record.husbandName
              : record.fatherName;
          return {
            verified: true,
            message: `Verified! Welcome back ${record.studentName} (Season 2 Record: ${guardianDetail}).`,
            matchedRecord: record,
            matchType: guardMatch.matchedField,
          };
        }
      } else {
        // Record had no guardian listed in Season 2 excel
        if (!record.husbandName && !record.fatherName) {
          return {
            verified: true,
            message: `Verified! Welcome back ${record.studentName} (Season 2 Alumni).`,
            matchedRecord: record,
            matchType: 'no_guardian_recorded',
          };
        }
      }
    }
  }

  return {
    verified: false,
    message:
      'You are not listed in the Season 2 Alumni records with the provided details. Please check the spelling of your name and father/husband name, or choose standard Female registration (₹2500) or contact Neel Sir (+91 8385969285).',
  };
}
