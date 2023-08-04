export interface GoogleDirectionResponse {
  geocoded_waypoints: GeocodedWaypoint[];
  routes: Route[];
  status: string;
}

export interface Polyline {
  points: string;
}

export interface GeocodedWaypoint {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Coordinates;
  southwest: Coordinates;
}

export interface ValueText {
  text: string;
  value: number;
}

export interface Step {
  distance: ValueText;
  duration: ValueText;
  end_location: Coordinates;
  html_instructions: string;
  maneuver: string;
  polyline: Polyline;
  start_location: Coordinates;
  travel_mode: string;
}

export interface Leg {
  distance: ValueText;
  duration: ValueText;
  duration_in_traffic: ValueText;
  end_address: string;
  end_location: Coordinates;
  start_address: string;
  start_location: Coordinates;
  steps: Step[];
  traffic_speed_entry: any[];
  via_waypoint: any[];
}

export interface Route {
  bounds: Bounds;
  copyrights: string;
  legs: Leg[];
  overview_polyline: Polyline;
  summary: string;
  warnings: any[];
  waypoint_order: any[];
}
