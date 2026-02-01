type CreatorCardProps = {
  name: string;
  imageUrl: string;
  description: string;
  url: string;
};

export default function CreatorCard({
  name,
  imageUrl,
  description,
  url,
}: CreatorCardProps) {
  return (
    <article style={{ maxWidth: "420px", margin: "0 auto" }}>
      <header>
        <h3 style={{ marginBottom: "0.25rem" }}>{name}</h3>
      </header>

      {imageUrl && (
        <div
          style={{
            width: "min(300px, 100%)",
            height: "min(300px, 100vw)",
            margin: "0.75rem 0",
            borderRadius: "0.5rem",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            loading="lazy"
          />
        </div>
      )}

      <p style={{ marginTop: "0.25rem", fontSize: "0.95rem" }}>{description}</p>

      <small style={{ opacity: 0.7 }}>{url}</small>
    </article>  
  );
}