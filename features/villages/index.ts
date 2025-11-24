// Server Components
export { ServerVillages } from "./server";

// UI Components
export {
  VillageBentoCard,
  VillagesBentoGrid,
  VillagesSkeleton,
  VillageCardSkeleton,
  VillagesPagination,
} from "./components";

// Utilities
export { fetchVillagesWithMembers } from "./utils";

// Types
export type {
  Village,
  VillagesResponse,
  VillageMember,
  VillageWithMembers,
  VillageSize,
} from "./types";
export { getVillageSize } from "./types";
