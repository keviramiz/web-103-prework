import { useState } from "react";
import { supabase } from "../client";

export default function AddCreator() {
    const [form, setForm] = useState({
        name: "",
        imageUrl: "",
        url: "",
        description: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await supabase.from("creators").insert([form]);

        setForm({ name: "", imageUrl: "", url: "", description: ""});
    }

    return(
    
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

            <button type="submit">Submit</button>
        </form>
    ); 
}