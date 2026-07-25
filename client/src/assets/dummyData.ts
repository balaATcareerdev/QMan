import type { SlotDataType } from "@/component/HomeComponents/ActiveServiceCard";

export interface ActiveServiceDataType {
  serviceName: string;
  description: string;
  scheduledDate: string;
  slots: SlotDataType[];
}

export const dummyActiveServices: ActiveServiceDataType[] = [
  {
    serviceName: "Breakfast Service",
    description: "Morning breakfast token distribution",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    slots: [
      {
        slotName: "Early Batch",
        startTime: "2026-07-22T08:00:00.000Z",
        endTime: "2026-07-22T08:30:00.000Z",
        status: "Active",
      },
      {
        slotName: "Regular Batch",
        startTime: "2026-07-22T08:30:00.000Z",
        endTime: "2026-07-22T09:00:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Late Batch",
        startTime: "2026-07-22T09:00:00.000Z",
        endTime: "2026-07-22T09:30:00.000Z",
        status: "Upcoming",
      },
    ],
  },

  {
    serviceName: "Lunch Service",
    description: "Lunch token distribution for employees",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    slots: [
      {
        slotName: "Batch B",
        startTime: "2026-07-22T12:30:00.000Z",
        endTime: "2026-07-22T13:00:00.000Z",
        status: "Active",
      },
      {
        slotName: "Batch C",
        startTime: "2026-07-22T13:00:00.000Z",
        endTime: "2026-07-22T13:30:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Batch D",
        startTime: "2026-07-22T13:30:00.000Z",
        endTime: "2026-07-22T14:00:00.000Z",
        status: "Upcoming",
      },
    ],
  },

  {
    serviceName: "Evening Snacks",
    description: "Snacks and tea distribution",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    slots: [
      {
        slotName: "Tea Batch",
        startTime: "2026-07-22T16:30:00.000Z",
        endTime: "2026-07-22T17:00:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Snacks Batch",
        startTime: "2026-07-22T17:00:00.000Z",
        endTime: "2026-07-22T17:30:00.000Z",
        status: "Upcoming",
      },
    ],
  },
];

export const dummyUpcomingServices: ActiveServiceDataType[] = [
  {
    serviceName: "Breakfast Service",
    description: "Morning breakfast token distribution",
    scheduledDate: "2026-07-23T00:00:00.000Z",
    slots: [
      {
        slotName: "Early Batch",
        startTime: "2026-07-23T08:00:00.000Z",
        endTime: "2026-07-23T08:30:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Regular Batch",
        startTime: "2026-07-23T08:30:00.000Z",
        endTime: "2026-07-23T09:00:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Late Batch",
        startTime: "2026-07-23T09:00:00.000Z",
        endTime: "2026-07-23T09:30:00.000Z",
        status: "Upcoming",
      },
    ],
  },

  {
    serviceName: "Lunch Service",
    description: "Lunch token distribution for employees",
    scheduledDate: "2026-07-24T00:00:00.000Z",
    slots: [
      {
        slotName: "Batch A",
        startTime: "2026-07-24T12:00:00.000Z",
        endTime: "2026-07-24T12:30:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Batch B",
        startTime: "2026-07-24T12:30:00.000Z",
        endTime: "2026-07-24T13:00:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Batch C",
        startTime: "2026-07-24T13:00:00.000Z",
        endTime: "2026-07-24T13:30:00.000Z",
        status: "Upcoming",
      },
    ],
  },

  {
    serviceName: "Dinner Service",
    description: "Dinner token distribution",
    scheduledDate: "2026-07-25T00:00:00.000Z",
    slots: [
      {
        slotName: "Dinner Batch A",
        startTime: "2026-07-25T19:00:00.000Z",
        endTime: "2026-07-25T19:30:00.000Z",
        status: "Upcoming",
      },
      {
        slotName: "Dinner Batch B",
        startTime: "2026-07-25T19:30:00.000Z",
        endTime: "2026-07-25T20:00:00.000Z",
        status: "Upcoming",
      },
    ],
  },
];

export const peekIntoUpcomingSlots = [
  {
    slotName: "Lunch Batch A",
    startTime: "2026-07-22T12:00:00.000Z",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    bookedCount: 12,
    description: "First lunch slot for employees.",
  },
  {
    slotName: "Lunch Batch B",
    startTime: "2026-07-22T12:30:00.000Z",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    bookedCount: 18,
    description: "Second lunch slot with higher capacity.",
  },
  {
    slotName: "Evening Tea",
    startTime: "2026-07-22T16:30:00.000Z",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    bookedCount: 7,
    description: "Tea and snacks distribution.",
  },
  {
    slotName: "Dinner Batch A",
    startTime: "2026-07-22T19:00:00.000Z",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    bookedCount: 24,
    description: "First dinner serving slot.",
  },
  {
    slotName: "Dinner Batch B",
    startTime: "2026-07-22T19:30:00.000Z",
    scheduledDate: "2026-07-22T00:00:00.000Z",
    bookedCount: 15,
    description: "Second dinner serving slot.",
  },
];
