import Details from "../../../components/Details";
import { ventures } from "../../../lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ventures.map((venture) => ({
    slug: venture.slug,
  }));
}

export default async function VenturePage({ params }) {
  const { slug } = await params;

  const venture = ventures.find(
    (item) => item.slug === slug
  );

  if (!venture) {
    notFound();
  }

  return <Details v={venture} />;
}