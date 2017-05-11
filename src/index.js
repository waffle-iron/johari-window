import 'react';
import { render } from 'react-dom';

import { routes  } from './router';
import './shared.css';


render(
  routes,
  document.getElementById('root')
);
