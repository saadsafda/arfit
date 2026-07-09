import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp?: number;
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp) {
      return decoded.exp > Math.floor(Date.now() / 1000);
    }
    return true;
  } catch (error) {
    return false;
  }
};


