import App from './app';
import { Documentation } from './pages/doc';
import Home from './pages/home';
import theme from './theme';

export default {
  theme,
  routes: [
    { path: '/', component: App, name: 'App' },
    { path: '/docs', component: Documentation, name: 'Docs' },
    { path: '/docs/:component', component: Documentation, name: 'Docs' },
    { path: '/home', component: Home, name: 'Home' }
  ]
}


