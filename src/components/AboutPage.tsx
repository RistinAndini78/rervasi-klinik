type Page =
  | 'landing'
  | 'queue'
  | 'reservation'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-doctors'
  | 'admin-services'
  | 'admin-reservations'
  | 'about';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return <></>;
}
