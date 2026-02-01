import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { supabase } from "../client";

type Creator = {
  creatorId: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
};

export default function ViewCreator() {
  const { creatorId } = useParams<{ creatorId: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      if (!creatorId) return;

      const { data, error } = await supabase
        .from("creators")
        .select("creatorId, name, url, description, imageUrl")
        .eq("creatorId", creatorId)
        .single();

      if (error) {
        console.error(error);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    }

    fetchCreator();
  }, [creatorId]);

  if (loading) return <div>Loading...</div>;

  if (!creator) {
    return (
      <div>
        <h1>Creator not found</h1>
        <Link to="/">← Back to creators</Link>
      </div>
    );
  }

  return (
  <div>
    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
      <Link to={`/creators/${creator.creatorId}/edit`}>
        Edit
      </Link>
    </div>

    <h1>{creator.name}</h1>

    {creator.imageUrl && (
      <img
        src={creator.imageUrl}
        alt={creator.name}
        style={{ maxWidth: 300, borderRadius: 12 }}
      />
    )}

    <p>{creator.description}</p>

    <a href={creator.url} target="_blank" rel="noreferrer">
      Visit creator
    </a>
  </div>
);
}