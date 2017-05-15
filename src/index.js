import 'react';
import { render } from 'react-dom';

import { routes  } from './router';
import './app.css';


render(
  routes,
  document.getElementById('root')
);
