export type Dog = {
  weight?: { imperial: string; metric: string };
  height?: { imperial: string; metric: string };
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
};

export type ComparableKeys = 'weight' | 'height' | 'bred_for' | 'breed_group' | 'life_span' | 'temperament' | 'origin'
