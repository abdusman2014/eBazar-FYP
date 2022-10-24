import Item from "../Model/Item";
import Category from "../Model/Category";

const mockCategoryData : Category[] = [
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
  { name: "Sofa", image: "../assets/images/sofa-icon.png" },
];
const mockCategoryWithOutImageData = [
  { name: "ALL", isSelected: true },
  { name: "Sofa", isSelected: false },
  { name: "Chair", isSelected: false },
  { name: "Table", isSelected: false },
  { name: "Kitchen", isSelected: false },
  { name: "lamp", isSelected: false },
];
const mockItemsData : Item[] = [
  {
    //key: '1',
    itemId: 1,
    name: "Two-seater gray sofa with two cushions, isolated",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    image: "../assets/images/sofa.jpg",
  },
  {
    //key: '2',
    itemId: 2,
    name: "Two-seater gray sofa with two cushions",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    image: "../assets/images/sofa.jpg",
  },
  {
    // key: '3',
    itemId: 3,
    name: "Two-seater gray sofa with two cushions, isolated",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    image: "../assets/images/sofa.jpg",
  },
];

export default {
  mockCategoryData,
  mockCategoryWithOutImageData,
  mockItemsData,
};
