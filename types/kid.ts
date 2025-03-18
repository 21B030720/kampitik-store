export interface KidLevel {
  id: number;
  level_name: string;
  level_image: string | null;
  level_position: number;
  from_xp: number;
  to_xp: number;
  next_level_position: number;
  current_progress: number;
}

export interface Kid {
  id: number;
  image: string | null;
  name: string;
  age: number;
  details: string;
  xp: number;
  kid_level: KidLevel;
}

export interface KidDetails extends Kid {
  details: string;
  // Add any additional fields that come from the /kids/{id}/ endpoint
} 