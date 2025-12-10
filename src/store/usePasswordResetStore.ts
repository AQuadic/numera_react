import { create } from "zustand";

const STORAGE_KEY = "numra_password_reset_flow";
const COOKIE_KEY = "numra_password_reset_step";

export type ResetStep = "request" | "verify" | "reset";

interface PasswordResetState {
  phone: string;
  phone_country: string;
  resetToken: string | null;
  step: ResetStep;
  setPhoneAndCountry: (phone: string, phone_country: string) => void;
  setStep: (step: ResetStep) => void;
  setResetToken: (token: string | null) => void;
  clear: () => void;
}

const DEFAULT_STATE: Pick<
  PasswordResetState,
  "phone" | "phone_country" | "resetToken" | "step"
> = {
  phone: "",
  phone_country: "EG",
  resetToken: null,
  step: "request",
};

const readFromStorage = () => {
  if (typeof window === "undefined") return {};
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Partial<PasswordResetState>;
    return {
      phone: parsed.phone ?? DEFAULT_STATE.phone,
      phone_country: parsed.phone_country ?? DEFAULT_STATE.phone_country,
      resetToken: parsed.resetToken ?? DEFAULT_STATE.resetToken,
      step: parsed.step ?? DEFAULT_STATE.step,
    } satisfies Partial<PasswordResetState>;
  } catch {
    return {};
  }
};

const writeStepCookie = (step: ResetStep) => {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_KEY}=${step};path=/;max-age=1800`;
};

const clearStepCookie = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_KEY}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const readStepCookie = (): ResetStep | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_KEY}=`));
  if (!match) return null;
  const value = match.split("=")[1] as ResetStep | undefined;
  if (value === "request" || value === "verify" || value === "reset") {
    return value;
  }
  return null;
};

export const usePasswordResetStore = create<PasswordResetState>()(
  (set, get) => {
    const initialState = { ...DEFAULT_STATE, ...readFromStorage() };

    const persist = (partial: Partial<PasswordResetState>) => {
      if (typeof window === "undefined") return;
      const snapshot = { ...get(), ...partial };
      const toStore = {
        phone: snapshot.phone,
        phone_country: snapshot.phone_country,
        resetToken: snapshot.resetToken,
        step: snapshot.step,
      } satisfies typeof DEFAULT_STATE;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    };

    return {
      ...initialState,
      setPhoneAndCountry: (phone, phone_country) => {
        set({ phone, phone_country });
        persist({ phone, phone_country });
      },
      setStep: (step) => {
        set({ step });
        writeStepCookie(step);
        persist({ step });
      },
      setResetToken: (token) => {
        set({ resetToken: token });
        persist({ resetToken: token });
      },
      clear: () => {
        set(DEFAULT_STATE);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(STORAGE_KEY);
        }
        clearStepCookie();
      },
    };
  }
);
