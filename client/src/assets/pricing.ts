export const Plan = {
  Free: "Free",
  Growth: "Growth",
  Ultimate: "Ultimate",
};

export const pricing = [
  {
    plan: Plan.Free,
    price: 0,
    tokens: 20,
    description:
      "Try the system and run small queues with basic limits. Simple and effective for small businesses.",
    CoreCapacity: [
      "1 Service",
      "Up to 2 Slots",
      "20 Tokens per Slot (40 total active tokens)",
    ],
    isPopular: false,
    isDisabled: false,
  },
  {
    plan: Plan.Growth,
    price: 25,
    tokens: 50,
    description:
      "Run your daily operations smoothly with faster queues and more control.",
    CoreCapacity: [
      "3 Service",
      "Up to 15 Slots",
      "50 Tokens per Slot (50 total active tokens)",
    ],
    isPopular: true,
    isDisabled: false,
  },
  {
    plan: Plan.Ultimate,
    price: 100,
    tokens: 75,
    description:
      "Handle heavy traffic with maximum speed, control, and reliability.",
    CoreCapacity: [
      "Unlimited Service",
      "Up to 30 Slots",
      "75 Tokens per Slot (75 total active tokens)",
    ],
    isPopular: false,
    isDisabled: false,
  },
];
