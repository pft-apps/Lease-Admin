// Utility functions for working days (Monday - Friday) calculation

export function isWorkingDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // 1 = Mon, 5 = Fri
}

/**
 * Calculates the end date given a start date and a target number of working days (Mon-Fri).
 * The start date itself counts as Day 1 if it is a working day (or the first working day on/after start date).
 */
export function calculateWorkingDaysEndDate(startDate: Date, workingDays: number): Date {
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);

  // If start date is weekend, roll forward to Monday
  while (!isWorkingDay(current)) {
    current.setDate(current.getDate() + 1);
  }

  let count = 1;
  while (count < workingDays) {
    current.setDate(current.getDate() + 1);
    if (isWorkingDay(current)) {
      count++;
    }
  }

  return current;
}

/**
 * Counts total working days (Mon-Fri) between two dates inclusive.
 */
export function countWorkingDaysBetween(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (start > end) return 0;

  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    if (isWorkingDay(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

/**
 * Given a start date and target total working days (e.g. 30),
 * calculates elapsed working days and remaining working days as of reference date.
 */
export function getAssessmentWorkingDaysProgress(
  startDateStr: string,
  totalWorkingDays: number = 30,
  referenceDateStr?: string
) {
  const start = new Date(startDateStr);
  start.setHours(0, 0, 0, 0);

  const end = calculateWorkingDaysEndDate(start, totalWorkingDays);

  // Reference date (default to current date or 2026-07-29 if in reference timeframe)
  let refDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
  refDate.setHours(0, 0, 0, 0);

  let elapsedDays = 0;

  if (refDate < start) {
    elapsedDays = 0;
  } else if (refDate >= end) {
    elapsedDays = totalWorkingDays;
  } else {
    // Count working days from start up to refDate
    elapsedDays = countWorkingDaysBetween(start, refDate);
    if (elapsedDays > totalWorkingDays) elapsedDays = totalWorkingDays;
  }

  const remainingDays = Math.max(0, totalWorkingDays - elapsedDays);
  const progressPercent = Math.min(100, Math.round((elapsedDays / totalWorkingDays) * 100));

  return {
    startDate: start,
    endDate: end,
    totalWorkingDays,
    elapsedDays,
    remainingDays,
    progressPercent,
  };
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
  const startDay = startDate.getDate();
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} – ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
}
