import { Plan } from "@/assets/pricing";

export type BuyButtonState =
  | { type: "lower"; text: "Lower" }
  | { type: "current"; text: "Active" }
  | { type: "upgrade"; text: "Upgrade" | "Go Ultimate" };

export function getBuyButtonText(
  plan: string,
  currentPlan: string,
): BuyButtonState {
  const planOrder = [Plan.Free, Plan.Growth, Plan.Ultimate];

  const currentIndex = planOrder.indexOf(currentPlan);
  const planIndex = planOrder.indexOf(plan);

  if (currentIndex === -1 || planIndex === -1) {
    return { type: "upgrade", text: "Upgrade" };
  }

  if (planIndex < currentIndex) return { type: "lower", text: "Lower" };

  if (planIndex === currentIndex) return { type: "current", text: "Active" };

  if (plan === "Growth") return { type: "upgrade", text: "Upgrade" };

  return { type: "upgrade", text: "Go Ultimate" };
}
