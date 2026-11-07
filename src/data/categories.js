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
  { id: 'plumber', name: 'Plumber', image: plumber, icon: '🔧', hint: 'Leaks, taps & fittings' },
  { id: 'electrician', name: 'Electrician', image: electrician, icon: '💡', hint: 'Wiring, fans & repairs' },
  { id: 'carpenter', name: 'Carpenter', image: carpenter, icon: '🪵', hint: 'Furniture & woodwork' },
  { id: 'painter', name: 'Painter', image: painter, icon: '🎨', hint: 'Walls, wood & polish' },
  { id: 'cleaner', name: 'Cleaner & Househelp', image: cleaner, icon: '🧹', hint: 'Home & deep cleaning' },
  { id: 'ac', name: 'AC Technician', image: ac, icon: '❄️', hint: 'Service, gas & install' },
  { id: 'beautician', name: 'Beautician', image: beautician, icon: '💅', hint: 'Salon at home' },
  { id: 'more', name: 'More services', image: more, icon: '➕', hint: 'Browse all trades', browseAll: true },
];

/** ProWorker Store — sell / rent products only (not services) */
export const storeCategories = [
  { id: 'food', title: 'Food Product', desc: 'Homemade meals, tiffins, bakery, sweets & snacks for sale', image: food },
  { id: 'clothing', title: 'Clothing', desc: 'Clothes for sale or rent — ethnic wear, party & formal outfits', image: clothing },
  { id: 'crafts', title: 'Crafts', desc: 'Handmade decor, candles, pottery, paintings & gifts for sale', image: crafts },
  { id: 'plants', title: 'Plants', desc: 'Indoor plants, planters and green gifts for sale' },
  { id: 'electronics', title: 'Electronics', desc: 'Gadgets and AV gear for sale or rent' },
  { id: 'furniture', title: 'Furniture', desc: 'Home and event furniture for sale or rent' },
  { id: 'tools', title: 'Tools & Gear', desc: 'Tools, camping and utility gear for sale or rent' },
];



