import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router";

type Creator = {
  creatorId: string;
  name: string;
  imageUrl: string;
  description: string;
  url: string;
};

export default function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select("*");

      if (error) {
        console.error(error);
      } else {
        setCreators(data ?? []);
      }
    }

    fetchCreators();
  }, []);

  return (
    <div>
      <h1>Creators</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          alignItems: "start",
        }}
      >
        {creators.map((creator) => (
          <Link
            key={creator.creatorId}
            to={`/creators/${creator.creatorId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <CreatorCard
              name={creator.name}
              imageUrl={creator.imageUrl}
              description={creator.description}
              url={creator.url}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}