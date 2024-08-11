import { json, LoaderFunction } from '@remix-run/node';
import MissingPage from 'src/pages/MissingPage/MissingPage';

export const loader: LoaderFunction = async () => {
  return json({ message: 'Page not found' }, { status: 404 });
};

export default function NotFoundPage() {
  return <MissingPage />;
}
