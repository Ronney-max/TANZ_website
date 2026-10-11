import { createRoot } from 'react-dom/client';
import Home from '../app/page';
import Projects from '../app/projects/page';
import Pos from '../app/hospitality/pos/page';
import '../app/globals.css';
const path = window.location.pathname.replace(/\/$/, '') || '/';
const routes: Record<string, {page: typeof Home, title: string}> = {
  '/': {page: Home, title: 'TANZ · Connected hospitality'},
  '/projects': {page: Projects, title: 'Hospitality projects · TANZ'},
  '/hospitality/pos': {page: Pos, title: 'Hospitality POS · TANZ'},
};
const route = routes[path];
document.title = route?.title || 'Page not found · TANZ';
const Page = route?.page;
createRoot(document.getElementById('root')!).render(Page ? <Page/> : <main className="section"><h1>Page not found</h1><p>Let’s get you back to TANZ.</p><a className="button" href="/">Go to the overview</a></main>);
