export type Category = "Tech" | "Sports" | "Academic" | "Social";

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  duration: number;
  category: Category;
  location: string;
  organizer: string;
  image: string;
  price: number;
  capacity: number;
  remainingCapacity: number;
}

export const EVENTS: Event[] = [
  {
    id: "1",
    title: "Next.js Summit 2025",
    description:
      "A full-day deep dive into the latest Next.js App Router features, server components, and edge deployments.",
    fullDescription:
      "Join hundreds of developers for a full-day deep dive into the latest Next.js App Router features, server components, and edge deployments. Speakers from Vercel, major tech companies, and the open-source community will share real-world case studies, performance secrets, and hands-on workshops. Whether you're a Next.js beginner or a seasoned veteran, this summit will level up your skills.",
    date: "2025-09-15",
    time: "9:00 AM – 6:00 PM",
    duration: 30,
    category: "Tech",
    location: "Nairobi Garage, Westlands, Nairobi",
    organizer: "DevKE Community",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    price: 2500,
    capacity: 200,
    remainingCapacity: 43,
  },
  {
    id: "2",
    title: "Nairobi Marathon 2025",
    description:
      "Run through the heart of Nairobi in Africa's most scenic urban marathon, with 5K, 10K, and full marathon categories.",
    fullDescription:
      "The Nairobi Marathon takes runners through iconic city landmarks, lush Uhuru Park, and the vibrant streets of downtown. This year features chip timing, finisher medals, hydration stations every 2km, and live entertainment throughout the route. Open to all fitness levels — choose your distance and join thousands of runners from across the continent.",
    date: "2025-10-05",
    time: "6:00 AM – 2:00 PM",
    duration: 50,
    category: "Sports",
    location: "Nyayo National Stadium, Nairobi",
    organizer: "Athletics Kenya",
    image:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80",
    price: 2000,
    capacity: 5000,
    remainingCapacity: 1872,
  },
  {
    id: "3",
    title: "AI & Machine Learning Bootcamp",
    description:
      "An intensive 3-day bootcamp covering Python, scikit-learn, TensorFlow, and real-world ML pipelines.",
    fullDescription:
      "This intensive 3-day bootcamp is designed for developers, data analysts, and curious minds who want to break into AI and machine learning. Covering everything from Python fundamentals and data preprocessing to neural networks and model deployment, participants will build three complete ML projects by the end of the camp. Laptops required. Certificates awarded on completion.",
    date: "2025-08-20",
    time: "8:00 AM – 5:00 PM",
    duration: 30,
    category: "Academic",
    location: "iHub, Kilimani, Nairobi",
    organizer: "DataScience Africa",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    price: 5000,
    capacity: 80,
    remainingCapacity: 5,
  },
  {
    id: "4",
    title: "Rooftop Networking Mixer",
    description:
      "An exclusive evening of networking, cocktails, and great conversations for professionals across industries.",
    fullDescription:
      "Step above the city skyline for an exclusive evening of meaningful connections. The Rooftop Networking Mixer brings together founders, creatives, engineers, and professionals for curated conversations, delicious cocktails, and live ambient music. Speed-networking rounds, open bar, and stunning views of Nairobi at night. Dress code: Smart casual.",
    date: "2025-07-28",
    time: "6:00 PM – 10:00 PM",
    duration: 30,
    category: "Social",
    location: "The Rooftop, Ole Sereni Hotel, Nairobi",
    organizer: "Young Professionals KE",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    price: 3500,
    capacity: 100,
    remainingCapacity: 0,
  },
  {
    id: "5",
    title: "Open Source Africa Conference",
    description:
      "Celebrating contributors, projects, and the future of open source software across the African continent.",
    fullDescription:
      "Open Source Africa Conference (OSAC) is a one-day celebration of open source culture, contributors, and projects built across the continent. Talks cover everything from first-time contributions to maintaining large-scale OSS projects. Expect lightning talks, a hackathon, contributor recognition awards, and panel discussions on sustainability in open source.",
    date: "2025-11-22",
    time: "10:00 AM – 7:00 PM",
    duration: 30,
    category: "Tech",
    location: "KEPSA, Upper Hill, Nairobi",
    organizer: "Open Source Africa",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    price: 1500,
    capacity: 350,
    remainingCapacity: 210,
  },
  {
    id: "6",
    title: "University Research Symposium",
    description:
      "Graduate students and researchers present cutting-edge findings across science, technology, and humanities.",
    fullDescription:
      "The Annual University Research Symposium showcases the best graduate-level research across disciplines including STEM, social sciences, environmental studies, and the humanities. Attendees can visit poster sessions, attend 20-minute research talks, and engage with faculty panelists. Open to students, researchers, and the general public.",
    date: "2025-06-10",
    time: "9:00 AM – 4:00 PM",
    duration: 30,
    category: "Academic",
    location: "University of Nairobi, Main Campus",
    organizer: "UoN Graduate School",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    price: 0,
    capacity: 500,
    remainingCapacity: 312,
  },
  {
    id: "7",
    title: "Nairobi Food Festival",
    description:
      "A weekend celebrating Kenyan cuisine, street food, craft beers, and live entertainment in Karura Forest.",
    fullDescription:
      "The Nairobi Food Festival returns for its 5th edition — a two-day celebration of food, culture, and community inside the beautiful Karura Forest. Over 60 food vendors, cooking demonstrations, a cocktail village, live music across three stages, and a kids' zone make this Nairobi's most anticipated social event of the year. Tickets include forest entry. Rain or shine.",
    date: "2025-08-02",
    time: "11:00 AM – 9:00 PM",
    duration: 30,
    category: "Social",
    location: "Karura Forest, Nairobi",
    organizer: "Taste of Nairobi",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    price: 800,
    capacity: 2000,
    remainingCapacity: 648,
  },
  {
    id: "8",
    title: "5-a-Side Football Tournament",
    description:
      "Compete in Nairobi's biggest inter-company 5-a-side football tournament. 32 teams. One trophy.",
    fullDescription:
      "Gather your squad and register for Nairobi's most competitive inter-company football tournament. 32 teams compete across two days in a group stage + knockout format on professional 5-a-side turf pitches. Referees provided. Trophies and medals for top 3 finishers. Post-tournament BBQ and awards ceremony. Registration closes 2 weeks before the event.",
    date: "2025-07-12",
    time: "8:00 AM – 6:00 PM",
    duration: 30,
    category: "Sports",
    location: "Kasarani Sports Complex, Nairobi",
    organizer: "KE Sports League",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    price: 1200,
    capacity: 320,
    remainingCapacity: 160,
  },
];
