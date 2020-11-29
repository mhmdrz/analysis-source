export class User {
  country: string;
  display_name: string;
  email: string;
  id: string;
  product: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  constructor(
    country: string,
    display_name: string,
    email: string,
    id: string,
    product: string,
    images: {
      url: string;
      height: number;
      width: number;
    }[]
  ) {
    this.country = country;
    this.display_name = display_name;
    this.email = email;
    this.id = id;
    this.product = product;
    this.images = images;
  }
}
