server.js
import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco (Aiven)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🔹 Rota de teste (verifica se o servidor e o banco estão funcionando)
app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ ok: true, hora: result.rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, erro: e.message });
  }
});

// 🔹 Porta em que o servidor vai rodar
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ Servidor ativo em http://localhost:${port}`));
