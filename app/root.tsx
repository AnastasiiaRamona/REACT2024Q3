import { Meta, Links, Outlet, Scripts } from '@remix-run/react';
import App from './app';
import './globals.css';
import { LinksFunction } from '@remix-run/node';
import Layout from './layout';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/star-wars' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap' },
  ];
};

export function Head() {
  return (
    <>
      <Meta />
      <Links />
      <title> Star Wars Heroes</title>
    </>
  );
}

function Document() {
  return (
    <html lang="en">
      <head>
        <Head />
      </head>

      <body>
        <App>
          <Layout>
            <Outlet />
            <Scripts />
          </Layout>
        </App>
      </body>
    </html>
  );
}

export default Document;
