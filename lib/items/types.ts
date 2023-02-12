import { Euler, Vector3 } from "three";
export interface Expand {}

export interface ItemType {
  description: string;
  created: string;
  id: string;
  src: string;
  name: string;
  position: Vector3;
  rotation: Euler;
  scale: number;
  updated: string;
  expand: Expand;
  vissible: boolean;
}
