import type { Characters } from "@/types";

// Helper to search in a field that can be string, array, or undefined
function matchesQuery(
  field: string | string[] | undefined,
  query: string
): boolean {
  if (!field) return false;
  if (Array.isArray(field)) {
    return field.some((item) => item.toLowerCase().includes(query));
  }
  return field.toLowerCase().includes(query);
}

export function filterCharacters(
  characters: Characters,
  query: string
): Characters {
  const normalizedQuery = query.toLowerCase().trim();

  return characters.filter((character) => {
    // Search in name
    if (matchesQuery(character.name, normalizedQuery)) return true;

    // Search in clan
    if (matchesQuery(character.personal?.clan, normalizedQuery)) return true;

    // Search in affiliations
    if (matchesQuery(character.personal?.affiliation, normalizedQuery))
      return true;

    // Search in jutsu
    if (matchesQuery(character.jutsu, normalizedQuery)) return true;

    // Search in nature types
    if (matchesQuery(character.natureType, normalizedQuery)) return true;

    // Search in classification
    if (matchesQuery(character.personal?.classification, normalizedQuery))
      return true;

    // Search in occupation
    if (matchesQuery(character.personal?.occupation, normalizedQuery))
      return true;

    // Search in team
    if (matchesQuery(character.personal?.team, normalizedQuery)) return true;

    // Search in titles
    if (matchesQuery(character.personal?.titles, normalizedQuery)) return true;

    // Search in tools
    if (matchesQuery(character.tools, normalizedQuery)) return true;

    // Search in kekkei genkai
    if (matchesQuery(character.personal?.kekkeiGenkai, normalizedQuery))
      return true;

    return false;
  });
}
