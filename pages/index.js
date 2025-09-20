import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
        // Redirigir automáticamente a la app
        window.location.href = "https://app.lustrix.tech";
      } else {
        alert("Error al suscribirte. Intenta de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error inesperado.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Bienvenido a LUSTRIX</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Introduce tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Empezar Gratis"}
        </button>
      </form>

      {success && <p>🎉 Revisa tu correo para acceder a la app.</p>}
    </div>
  );
}
