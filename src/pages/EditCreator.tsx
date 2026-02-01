import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { supabase } from "../client";

type FormState = {
  name: string;
  imageUrl: string;
  url: string;
  description: string;
};

export default function EditCreator() {
  const { creatorId } = useParams<{ creatorId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    imageUrl: "",
    url: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCreator() {
      if (!creatorId) {
        setErrorMsg("Missing creator id.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("creators")
        .select("name, imageUrl, url, description")
        .eq("creatorId", creatorId)
        .single();

      if (error) {
        console.error(error);
        setErrorMsg("Failed to load creator.");
      } else if (data) {
        setForm({
          name: data.name ?? "",
          imageUrl: data.imageUrl ?? "",
          url: data.url ?? "",
          description: data.description ?? "",
        });
      }

      setLoading(false);
    }

    fetchCreator();
  }, [creatorId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!creatorId) return;

    setSaving(true);
    setErrorMsg(null);

    const { error } = await supabase
      .from("creators")
      .update(form)
      .eq("creatorId", creatorId);

    setSaving(false);

    if (error) {
      console.error(error);
      setErrorMsg("Failed to save changes.");
      return;
    }

    navigate(`/creators/${creatorId}`);
  }

  async function handleDelete() {
    if (!creatorId) return;

    const confirmDelete = window.confirm(
      "Delete this creator? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setDeleting(true);
    setErrorMsg(null);

    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("creatorId", creatorId);

    setDeleting(false);

    if (error) {
      console.error(error);
      setErrorMsg("Failed to delete creator.");
      return;
    }

    navigate("/");
  }

  if (loading) return <div>Loading...</div>;

  if (errorMsg) {
    return (
      <div>
        <h1>Edit Creator</h1>
        <p>{errorMsg}</p>
        <Link to={creatorId ? `/creators/${creatorId}` : "/"}>← Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Creator</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Creator Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="imageUrl"
          placeholder="Creator Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <input
          name="url"
          placeholder="Social Media Link"
          value={form.url}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={saving || deleting}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link to={`/creators/${creatorId}`}>← Cancel</Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={saving || deleting}
        >
          {deleting ? "Deleting..." : "Delete Creator"}
        </button>
      </div>
    </div>
  );
}