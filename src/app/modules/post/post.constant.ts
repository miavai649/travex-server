export const POST_CATEGORY = {
  Adventure: "Adventure",
  BusinessTravel: "Business Travel",
  Exploration: "Exploration",
  BudgetTravel: "Budget Travel",
  LuxuryTravel: "Luxury Travel",
  SoloTravel: "Solo Travel",
  FamilyTravel: "Family Travel",
  RoadTrips: "Road Trips",
} as const;

export const PostsSearchableFields = [
  "title",
  "content",
  "images",
  "description",
];
