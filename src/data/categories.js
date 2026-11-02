import plumber from '../assets/marketplace/cat-plumber.jpg?url';
import electrician from '../assets/marketplace/cat-electrician.jpg?url';
import carpenter from '../assets/marketplace/cat-carpenter.jpg?url';
import painter from '../assets/marketplace/cat-painter.jpg?url';
import cleaner from '../assets/marketplace/cat-cleaner.jpg?url';
import ac from '../assets/marketplace/cat-ac.jpg?url';
import beautician from '../assets/marketplace/cat-beautician.jpg?url';
import more from '../assets/marketplace/cat-more.jpg?url';
import food from '../assets/marketplace/cat-food.jpg?url';
import clothing from '../assets/marketplace/cat-clothing.jpg?url';
import crafts from '../assets/marketplace/cat-crafts.jpg?url';

/** Professional Service Categories (Home & Trade Services) */
export const serviceCategories = [
  { id: 'plumber', name: 'Plumber', image: plumber },
  { id: 'electrician', name: 'Electrician', image: electrician },
  { id: 'carpenter', name: 'Carpenter', image: carpenter },
  { id: 'painter', name: 'Painter', image: painter },
  { id: 'cleaner', name: 'Cleaner & Househelp', image: cleaner },
  { id: 'ac', name: 'AC Technician', image: ac },
  { id: 'beautician', name: 'Beautician', image: beautician },
  { id: 'more', name: 'More services', image: more, browseAll: true },
];

/** ProWorker Store — Open Local Marketplace (Sell Homemade Products) */
export const storeCategories = [
  { id: 'food', title: 'Homemade Food & Tiffins', desc: 'Fresh home-cooked meals, daily tiffins, bakery, sweets & snacks', image: food },
  { id: 'clothing', title: 'Clothes & Custom Tailoring', desc: 'Handcrafted apparel, boutique dresses, ethnic wear & alterations', image: clothing },
  { id: 'crafts', title: 'Handmade Crafts & Art', desc: 'Artisan decor, handmade candles, pottery, paintings & gifts', image: crafts },
  { id: 'homemade', title: 'Homemade Specialities & Goods', desc: 'Organic items, herbal care, festive hampers & homemade creations', isGeneral: true },
];



