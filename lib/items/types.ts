import { Euler, Vector3 } from "three";
export interface Expand {}

export interface ItemType {
  painter_gr: string;
  collectionId: string;
  collectionName: string;
  type?: "hotspot" | "image" | "video" | "desc";
  painter_en: string;
  material_gr: string;
  material_en: string;
  flat?: boolean;
  popup_video?: string;
  popup_image?: string;
  title_gr: string;
  title_en: string;
  img: string;
  description_el?: string;
  description_en?: string;
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
    painter: {
      biography_en: string;
      biography_gr: string;
      collectionId: string;
      collectionName: string;
      created: string;
      date: string;
      id: string;
      name_en: string;
      name_gr: string;
      updated: string;
    };
  };
  id: string;
  src: string;
  position: Vector3;
  rotation: Euler;
  scale: number;
  onClick: string;
  size: string;
  goToScene: string;
}
