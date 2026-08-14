/** Web3Forms-Free-Sitekey — kein eigenes hCaptcha-Konto nötig. */
export const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

type HcaptchaApi = {
  render: (
    el: string | HTMLElement,
    opts: Record<string, unknown>,
  ) => string | number;
  getResponse: (id?: string | number) => string;
  reset: (id?: string | number) => void;
};

declare global {
  interface Window {
    hcaptcha?: HcaptchaApi;
  }
}

let loadPromise: Promise<void> | null = null;

export function loadHcaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hcaptcha) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="js.hcaptcha.com"]',
    );
    if (existing) {
      if (window.hcaptcha) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("hCaptcha konnte nicht geladen werden")),
        { once: true },
      );
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.hcaptcha.com/1/api.js?hl=de&render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("hCaptcha konnte nicht geladen werden"));
    document.head.appendChild(s);
  });
  return loadPromise;
}

export async function renderHcaptcha(
  el: HTMLElement,
): Promise<string | number> {
  await loadHcaptcha();
  if (!window.hcaptcha) throw new Error("hCaptcha nicht verfügbar");
  return window.hcaptcha.render(el, {
    sitekey: HCAPTCHA_SITEKEY,
    hl: "de",
  });
}

export function readHcaptchaToken(widgetId?: string | number): string {
  if (!window.hcaptcha) return "";
  try {
    return window.hcaptcha.getResponse(widgetId) || "";
  } catch {
    return "";
  }
}

export function resetHcaptcha(widgetId?: string | number) {
  try {
    window.hcaptcha?.reset(widgetId);
  } catch {
    /* ignore */
  }
}

export const BOTCHECK_LABEL =
  "Bitte bestätigen Sie: Ich bin kein Roboter.";
