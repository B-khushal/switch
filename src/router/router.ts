import { useState, useEffect } from 'react';

export function useNavigate() {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('popstate'));
  };
  return navigate;
}

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return pathname;
}
