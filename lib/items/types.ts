export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Rotation {
  isEuler: boolean;
  _x: number;
  _y: number;
  _z: number;
  _order: string;
}

export interface Expand {}

export interface ItemType {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  image: string;
  name: string;
  position: Position;
  rotation: Rotation;
  scale: number;
  updated: string;
  expand: Expand;
}
