import { Euler, Vector3 } from "three";
export interface Expand {}

export interface ItemType {
  painter_gr: string;
  painter_en: string;
  material_gr: string;
  material_en: string;
  title_gr: string;
  title_en: string;
  img: string;
  painter_date: string;
  painter_biography_gr: string;
  painter_biography_en: string;
  expand: {
    image: {
      collectionId: string;
      collectionName: string;
      created: string;
      id: string;
      image: string;
      name: string;
      updated: string;
    };
  };
  id: string;
  src: string;
  position: Vector3;
  rotation: Euler;
  scale: number;
  onClick: string;
  goToScene: string;
}
