
// ─── Mock Events ─────────────────────────────────────────────────────────────

export const mockEvents: any = [
  {
    id: "evt_1",
    title: "Next.js Summit 2025",
    description: "Deep dive into App Router features.",
    fullDescription:
      "Join hundreds of developers for a full-day deep dive into the latest Next.js App Router features, server components, and edge deployments.",
    date: new Date("2025-09-15T09:00:00"),
    category: "Tech",
    location: "Nairobi Garage, Westlands",
    organizer: "DevKE Community",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    price: 1500,
    capacity: 200,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "evt_2",
    title: "Nairobi Marathon 2025",
    description: "Africa's most scenic urban marathon.",
    fullDescription:
      "The Nairobi Marathon takes runners through iconic city landmarks, lush Uhuru Park, and the vibrant streets of downtown.",
    date: new Date("2025-10-05T06:00:00"),
    category: "Sport",
    location: "Nyayo National Stadium",
    organizer: "Athletics Kenya",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
    price: 2000,
    capacity: 5000,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
  },
  {
    id: "evt_3",
    title: "Rooftop Networking Mixer",
    description: "Exclusive evening of networking and cocktails.",
    fullDescription:
      "Step above the city skyline for an exclusive evening of meaningful connections, craft cocktails, and live ambient music.",
    date: new Date("2025-07-28T18:00:00"),
    category: "Social",
    location: "Ole Sereni Hotel, Nairobi",
    organizer: "Young Professionals KE",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    price: 3000,
    capacity: 100,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
  },
];

// ─── Mock User ────────────────────────────────────────────────────────────────

export const mockUser: any = {
  id: "usr_mock123",
  clerkId: "clerk_mock123",
  email: "jane.doe@example.com",
  firstName: "Jane",
  lastName: "Doe",
  phone: "+254 712 345 678",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-06-01"),
  bookedEvents: [
    {
      id: "bk_1",
      userId: "usr_mock123",
      eventId: "evt_1",
      paymentId: "pay_abc123",
      reciept: "RCP-2025-001",
      createdAt: new Date("2025-03-10"),
      updatedAt: new Date("2025-03-10"),
      event: mockEvents[0],
    },
    {
      id: "bk_2",
      userId: "usr_mock123",
      eventId: "evt_2",
      paymentId: "pay_def456",
      reciept: "RCP-2025-002",
      createdAt: new Date("2025-04-05"),
      updatedAt: new Date("2025-04-05"),
      event: mockEvents[1],
    },
    {
      id: "bk_3",
      userId: "usr_mock123",
      eventId: "evt_3",
      paymentId: "pay_ghi789",
      reciept: "RCP-2025-003",
      createdAt: new Date("2025-05-20"),
      updatedAt: new Date("2025-05-20"),
      event: mockEvents[2],
    },
  ],
};