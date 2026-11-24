/**
 * Loads all seed families from /data/families/
 */
export async function loadFamilies() {
  const index = [
    'signs-stop-vs-yield-001',
    'signs-no-entry-001',
    'rules-following-distance-001',
    'rules-fourway-stop-001',
    'controls-handbrake-001'
  ];
  const families = [];
  for (const id of index) {
    const res = await fetch(`./data/families/${id}.json`);
    if (res.ok) families.push(await res.json());
  }
  return families;
}

export function pickVariant(family) {
  const v = family.variants;
  return v[Math.floor(Math.random() * v.length)];
}
