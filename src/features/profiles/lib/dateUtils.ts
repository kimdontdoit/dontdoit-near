import { format } from "date-fns";
import { CV_DATE_CONSTANTS } from "./constants";

export interface MonthYearParts {
  year: string;
  month: string;
}

export const splitMonthYear = (value: string | null | undefined): MonthYearParts => {
  if (!value) return { year: "", month: CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL };
  const [year, month] = value.split("-");
  return {
    year: year ?? "",
    month: month ?? CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL
  };
};

export const toMonthYear = (year: string, month: string): string => {
  if (!month || month === CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL) {
    return year;
  }
  return `${year}-${month}`;
};

export const formatMonthYear = (value: string | null | undefined): string => {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!month || !year) {
    return year ?? "";
  }
  const date = new Date(Number(year), Number(month) - 1, 1);
  return format(date, "MMM yyyy");
};

export const formatDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): string => {
  const startLabel =
    formatMonthYear(startDate) || CV_DATE_CONSTANTS.UNKNOWN_DATE_LABEL;
  const endLabel = endDate
    ? formatMonthYear(endDate)
    : CV_DATE_CONSTANTS.CURRENT_DATE_LABEL;

  return startLabel ? `${startLabel} — ${endLabel}` : endLabel;
};

export const MONTH_OPTIONS = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" }
] as const;

const _yearOptionsCache = (() => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - CV_DATE_CONSTANTS.MIN_YEAR + 1 },
    (_, index) => (currentYear - index).toString()
  );
})();

export const getYearOptions = (): readonly string[] => _yearOptionsCache;
