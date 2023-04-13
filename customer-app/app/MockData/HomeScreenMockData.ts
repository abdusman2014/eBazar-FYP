import Item from "../Model/Item";
import Category from "../Model/Category";

const mockSorting = [
  { type: "Popular", isSelected: false},
  { type: "Most Recent" , isSelected: false},
  { type: "Price: High to Low" , isSelected: false},
  { type: "Price: Low to High", isSelected: false },
  { type: "In-Stock" , isSelected: false},
  { type: "Nearest" , isSelected: false},
];

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
    name: "Two-seater sofa ",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    color: 'gray',
    image: "../assets/images/sofa.jpg",
    description: 'gray sofa with two cushions, isolated',
  },
  {
    //key: '2',
    itemId: 2,
    name: "Three-seater sofa",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    color: 'gray',
    image: "../assets/images/sofa.jpg",
    description:'gray sofa with two cushions'
  },
  {
    // key: '3',
    itemId: 3,
    name: "Four-seater sofa",
    rating: 3.5,
    price: 1200,
    soldCount: 800,
    color: 'gray',
    image: "../assets/images/sofa.jpg",
    description:'gray sofa with two cushions, isolated'
  },
];

export default {
  mockCategoryData,
  mockCategoryWithOutImageData,
  mockItemsData,
  mockSorting,
};
