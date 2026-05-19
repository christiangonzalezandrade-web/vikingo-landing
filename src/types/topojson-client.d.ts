declare module "topojson-client" {
  import type { FeatureCollection, GeometryObject } from "geojson";
  import type { Topology } from "topojson-specification";

  export function feature<T extends Topology>(
    topology: T,
    object: T["objects"][keyof T["objects"]]
  ): FeatureCollection<GeometryObject>;
}
