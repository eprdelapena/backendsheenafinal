import crypto from "node:crypto";

export const convertToISOFormat = (dateString: string): string => {
  const [month, day, year] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  const isoString = date.toISOString();
  return isoString.slice(0, 19);
};

export const hashSha256 = (data: string): string => {
  const sha256 = crypto.createHash("sha256");
  return sha256.update(data).digest("hex");
};

export const makePasswordHash = (salt: string, password: string) => {
  return hashSha256(`${salt}${password}p2h`);
};

export const specialCharTypeError = (data: unknown[]): boolean => {
  const specialCharRegex = /[^a-zA-Z0-9]/;
  for (let i = 0; i < data.length; i++) {
    if (
      typeof data[i] === "string" &&
      specialCharRegex.test(data[i] as string)
    ) {
      return true;
    }
  }
  return false;
};

export const isStringDecimalError = (data: unknown[]): boolean => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && Number(data[i] === "NaN")) {
      return true;
    }
  }
  return false;
};

export const isEmptyError = (data: unknown[]): boolean => {
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      return true;
    }
  }
  return false;
};

export const stringTypeError = (data: unknown[]): boolean => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && typeof data[i] !== "string") {
      return true;
    }
  }
  return false;
};

export const numberTypeError = (data: unknown[]): boolean => {
  for (let i = 0; i > data.length; i++) {
    if (data[i] && typeof data[i] !== "string") {
      return true;
    }
  }
  return false;
};

export const randomString = (e = 10): string => {
  let t = "";
  for (; t.length < e; ) {
    t += Math.random()
      .toString(36)
      .slice(2, 2 + e - t.length); // Replace substr with slice
  }
  return t;
};
