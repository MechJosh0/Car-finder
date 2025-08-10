import type { ClampOptions } from "~/types/helpers";

export const validateParamNumber = (param: string | string[] | undefined) => {
  if (!param) return null;
  const paramString = String(param);
  if (!/^\d+$/.test(paramString)) return null;
  const paramNumber = parseInt(paramString, 10);
  return paramNumber > 0 ? paramNumber : null;
};

export const clamp = (
  value: string | number | null | undefined,
  { min = 1, max = 1000, defaultValue = 25 }: ClampOptions = {},
): number => {
  const num = parseInt(String(value), 10) || defaultValue;

  if (max) {
    return Math.max(min, Math.min(max, num));
  }

  return Math.max(min, num);
};
