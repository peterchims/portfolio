import AdminContentApp from './AdminContentApp';
import AppModern from './AppModern';

function isAdminPath(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.pathname.startsWith('/admin');
}

export default function App() {
  return isAdminPath() ? <AdminContentApp /> : <AppModern />;
}
