export const CV_DATE_CONSTANTS = {
  YEAR_ONLY_SENTINEL: "__YEAR_ONLY__",
  MIN_YEAR: 1950,
  UNKNOWN_DATE_LABEL: "Unknown",
  CURRENT_DATE_LABEL: "Now"
} as const;

export type YearOnlySentinel = typeof CV_DATE_CONSTANTS.YEAR_ONLY_SENTINEL;
export type MonthValue =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";
