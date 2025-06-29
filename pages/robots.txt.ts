export async function getServerSideProps({ res }: any) {
  const robots = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://katec.vn/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return { props: {} };
}

export default function Robots() {
  return null;
}
