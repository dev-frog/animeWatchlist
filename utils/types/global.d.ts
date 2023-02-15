// global types
export {};

declare global {
  type Image = {
    url: string | StaticImport;
    id: number;
    href: string;
    imgUrl: string;
    name: string;
    rate: number;
  };
}
