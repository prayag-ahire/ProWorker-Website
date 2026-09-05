import plumber from '../assets/marketplace/cat-plumber.jpg';
import electrician from '../assets/marketplace/cat-electrician.jpg';
import carpenter from '../assets/marketplace/cat-carpenter.jpg';
import painter from '../assets/marketplace/cat-painter.jpg';
import cleaner from '../assets/marketplace/cat-cleaner.jpg';
import ac from '../assets/marketplace/cat-ac.jpg';
import beautician from '../assets/marketplace/cat-beautician.jpg';
import more from '../assets/marketplace/cat-more.jpg';

export const serviceCategories = [
  { id: 'plumber', name: 'Plumber', image: plumber },
  { id: 'electrician', name: 'Electrician', image: electrician },
  { id: 'carpenter', name: 'Carpenter', image: carpenter },
  { id: 'painter', name: 'Painter', image: painter },
  { id: 'cleaner', name: 'Cleaner', image: cleaner },
  { id: 'ac', name: 'AC Technician', image: ac },
  { id: 'beautician', name: 'Beautician', image: beautician },
  { id: 'more', name: 'More services', image: more, browseAll: true },
];
