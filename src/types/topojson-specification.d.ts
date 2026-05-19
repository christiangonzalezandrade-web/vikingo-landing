declare module "topojson-specification" {
  export interface Topology {
    type: "Topology";
    objects: Record<string, GeometryCollection>;
  }

  export interface GeometryCollection {
    type: "GeometryCollection";
    geometries: Array<{ type: string; id?: string | number; properties?: Record<string, unknown> }>;
  }
}
