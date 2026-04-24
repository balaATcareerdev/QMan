import { Plan } from "@/assets/pricing";

export function getBuyButtonText(plan: string, currentPlan: string) {
  const planOrder = [Plan.Free, Plan.Growth, Plan.Ultimate];

  const currentIndex = planOrder.indexOf(currentPlan);
  const planIndex = planOrder.indexOf(plan);

  if (planIndex < currentIndex) return { type: "Lower", text: "Lower" };

  if (planIndex === currentIndex) return { type: "current", text: "Active" };

  if (plan === "Growth") return { type: "upgrade", text: "Upgrade" };

  return { type: "upgrade", text: "Go Ultimate" };
}
