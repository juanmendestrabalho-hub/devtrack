import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  async function load() {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function create() {
    await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, type, duration: Number(duration) })
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>DevTrack Dashboard</h1>

      <input placeholder="Título" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Tipo" onChange={e => setType(e.target.value)} />
      <input placeholder="Duração (min)" onChange={e => setDuration(e.target.value)} />

      <button onClick={create}>Adicionar</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} - {t.type} - {t.duration}min
          </li>
        ))}
      </ul>
    </div>
  );
}
