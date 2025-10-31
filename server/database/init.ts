import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../../data/students.db");

// Criar o banco de dados
export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ Erro ao conectar com o banco de dados:", err.message);
  } else {
    console.log("✅ Conectado ao banco de dados SQLite");
  }
});

export const initDatabase = () => {
  const createStudentsTable = `
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      whatsapp TEXT NOT NULL,
      objective TEXT NOT NULL,
      health_restrictions TEXT,
      shift TEXT NOT NULL CHECK(shift IN ('morning', 'afternoon', 'evening')),
      enrollment_date TEXT NOT NULL,
      is_enrolled INTEGER DEFAULT 0,
      enrolled_at TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createStudentsTable, (err) => {
    if (err) {
      console.error("❌ Erro ao criar tabela students:", err.message);
    } else {
      console.log("✅ Tabela students criada/verificada com sucesso");
    }
  });

  // Trigger para atualizar updated_at automaticamente
  const createTrigger = `
    CREATE TRIGGER IF NOT EXISTS update_students_updated_at 
    AFTER UPDATE ON students
    BEGIN
      UPDATE students SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `;

  db.run(createTrigger, (err) => {
    if (err) {
      console.error("❌ Erro ao criar trigger:", err.message);
    } else {
      console.log("✅ Trigger de atualização criado com sucesso");
    }
  });
};

export default db;
