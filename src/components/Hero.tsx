import { Link } from "react-router";

export default function Hero() {
  return (
    <div>
      <h1>Creatorverse</h1>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <Link to="/">
          <button>View All Creators</button>
        </Link>

        <Link to="/AddCreator">
          <button>Add A Creator</button>
        </Link>
      </div>
    </div>
  );
}