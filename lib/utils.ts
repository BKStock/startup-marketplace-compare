import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}k`;
  }
  return `$${amount}`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "full-business": "ビジネス丸ごと売買",
    "tool-license": "ツール・ライセンス販売",
    "lifetime-deal": "Lifetime Deal",
    "community": "コミュニティ・リサーチ",
  };
  return labels[category] || category;
}

export function getSubcategoryLabel(subcategory: string): string {
  const labels: Record<string, string> = {
    large: "大規模",
    medium: "中規模",
    small: "小規模",
    niche: "ニッチ特化",
    code: "コード販売",
    digital: "デジタル製品",
    research: "リサーチ",
  };
  return labels[subcategory] || subcategory;
}
