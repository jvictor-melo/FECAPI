import { useState, useEffect } from "react";

export default function CrudForm({ fields, onSubmit, initialData }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          placeholder={field.label}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        />
      ))}
      <button type="submit">Salvar</button>
    </form>
  );
}
