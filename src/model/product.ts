
// Class product with attributes matching in the data.json file
class product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  constructor(
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
  }
}
export default product;