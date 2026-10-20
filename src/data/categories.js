import plumber from '../assets/marketplace/cat-plumber.jpg?url';
import electrician from '../assets/marketplace/cat-electrician.jpg?url';
import carpenter from '../assets/marketplace/cat-carpenter.jpg?url';
import painter from '../assets/marketplace/cat-painter.jpg?url';
import cleaner from '../assets/marketplace/cat-cleaner.jpg?url';
import ac from '../assets/marketplace/cat-ac.jpg?url';
import beautician from '../assets/marketplace/cat-beautician.jpg?url';
import more from '../assets/marketplace/cat-more.jpg?url';

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
