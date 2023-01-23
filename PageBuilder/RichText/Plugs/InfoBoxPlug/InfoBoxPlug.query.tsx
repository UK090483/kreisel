const infoBoxPlugItemQuery = `
_key,rows,title,bgColor,
`;
export const infoBoxPlugQuery = `
_type == "infoBox" => {
  _type,
  _key,
  'items':items[]{${infoBoxPlugItemQuery}},
}
`;

interface ImageGalleryPlugItem {
  _type: "imageGalleryItem";
  title?: string;
  rows?: [{ _key: string; content?: any[] | null }];
  bgColor: "red" | "blue" | "yellow" | "green";
  _key: string;
}

export interface ImageGalleryPlugResult {
  _type: "imageGalleryPlug";
  rows?: number;
  name?: string;
  items: ImageGalleryPlugItem[];
}
