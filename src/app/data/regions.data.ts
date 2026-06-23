export interface Region {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const REGIONS: Region[] = [
  { id: 'dakar',       name: 'Dakar',        lat: 14.6928, lon: -17.4467 },
  { id: 'thies',       name: 'Thiès',        lat: 14.7886, lon: -16.9260 },
  { id: 'saint-louis', name: 'Saint-Louis',  lat: 16.0179, lon: -16.4896 },
  { id: 'ziguinchor',  name: 'Ziguinchor',   lat: 12.5500, lon: -16.2700 },
  { id: 'diourbel',    name: 'Diourbel',     lat: 14.6556, lon: -16.2310 },
  { id: 'louga',       name: 'Louga',        lat: 15.6136, lon: -16.2241 },
  { id: 'fatick',      name: 'Fatick',       lat: 14.3390, lon: -16.4113 },
  { id: 'kaolack',     name: 'Kaolack',      lat: 14.1652, lon: -16.0757 },
  { id: 'kolda',       name: 'Kolda',        lat: 12.8832, lon: -14.9411 },
  { id: 'tambacounda', name: 'Tambacounda',  lat: 13.7707, lon: -13.6673 },
  { id: 'matam',       name: 'Matam',        lat: 15.6559, lon: -13.2553 },
  { id: 'kaffrine',    name: 'Kaffrine',     lat: 14.1059, lon: -15.5510 },
  { id: 'kedougou',    name: 'Kédougou',     lat: 12.5605, lon: -12.1747 },
  { id: 'sedhiou',     name: 'Sédhiou',      lat: 12.7082, lon: -15.5569 },
];