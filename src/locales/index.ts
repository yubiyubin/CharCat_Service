import { ko } from "./ko";
import { en } from "./en";

export type Language = "ko" | "en";

export const dictionaries = {
  ko,
  en,
};

export type Dictionary = typeof ko;
