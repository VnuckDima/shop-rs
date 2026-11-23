import { svgIcon } from "./dom";
import { t } from "./i18n";

export type BenefitKey = "delivery" | "warranty" | "returns" | "installment";

export type BenefitInfo = {
  key: BenefitKey;
  image: string;
  iconPaths: string[];
};

export const BENEFITS: BenefitInfo[] = [
  {
    key: "delivery",
    image: "/img/delivery.jpg",
    iconPaths: [
      "M1 3h15v13H1z",
      "M16 8h4l3 3v5h-7V8z",
      "M5.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
      "M18.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
    ],
  },
  {
    key: "warranty",
    image: "/img/warranty.jpg",
    iconPaths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  },
  {
    key: "returns",
    image: "/img/returns.jpg",
    iconPaths: ["M1 4v6h6", "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"],
  },
  {
    key: "installment",
    image: "/img/installment.jpg",
    iconPaths: ["M1 4h22v16H1z", "M1 10h22"],
  },
];

export function getBenefit(key: BenefitKey): BenefitInfo {
  const benefit = BENEFITS.find((item) => item.key === key);
  if (!benefit) throw new Error(`Unknown benefit: ${key}`);
  return benefit;
}

export function createBenefitIcon(key: BenefitKey): SVGElement {
  return svgIcon(getBenefit(key).iconPaths);
}

export function benefitTitle(key: BenefitKey): string {
  return t(`benefit.${key}.title`);
}

export function benefitText(key: BenefitKey): string {
  return t(`benefit.${key}.text`);
}

export function benefitDetails(key: BenefitKey): string[] {
  return [1, 2, 3].map((index) => t(`benefit.${key}.detail${index}`));
}