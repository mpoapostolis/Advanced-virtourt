import { Euler, Vector3 } from "three";
export interface Expand {}

export interface ItemType {
  collectionId: string;
  collectionName: string;
  description: string;
  created: string;
  id: string;
  image: string;
  name: string;
  position: Vector3;
  rotation: Euler;
  scale: number;
  updated: string;
  expand: Expand;
}
