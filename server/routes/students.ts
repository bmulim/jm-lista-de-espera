import express from "express";
import db from "../database/init.js";
import type { Student, StudentFormData } from "../types/index.js";

const router = express.Router();

// Interface para dados do banco SQLite
interface StudentRow {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  objective: string;
  health_restrictions: string | null;
  shift: string;
  enrollment_date: string;
  is_enrolled: number;
  enrolled_at: string | null;
}

// Função helper para converter row do banco para Student
const rowToStudent = (row: StudentRow): Student => ({
  id: row.id,
  name: row.name,
  email: row.email,
  whatsapp: row.whatsapp,
  objective: row.objective,
  healthRestrictions: row.health_restrictions || "",
  shift: row.shift as "morning" | "afternoon" | "evening",
  enrollmentDate: row.enrollment_date,
  isEnrolled: Boolean(row.is_enrolled),
  enrolledAt: row.enrolled_at || undefined,
});

// GET /api/students - Listar todos os estudantes
router.get("/", (req, res) => {
  const sql = `
    SELECT * FROM students 
    ORDER BY enrollment_date ASC
  `;

  db.all(sql, [], (err, rows: unknown[]) => {
    if (err) {
      console.error("Erro ao buscar estudantes:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }

    const students = rows.map((row) => rowToStudent(row as StudentRow));
    res.json(students);
  });
});

// POST /api/students - Criar novo estudante
router.post("/", (req, res) => {
  const studentData: StudentFormData = req.body;

  // Validação básica
  if (
    !studentData.name ||
    !studentData.email ||
    !studentData.whatsapp ||
    !studentData.objective
  ) {
    res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
    return;
  }

  const id = Date.now().toString();
  const enrollmentDate = new Date().toISOString();

  const sql = `
    INSERT INTO students (id, name, email, whatsapp, objective, health_restrictions, shift, enrollment_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    id,
    studentData.name,
    studentData.email,
    studentData.whatsapp,
    studentData.objective,
    studentData.healthRestrictions || "",
    studentData.shift,
    enrollmentDate,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed: students.email")) {
        res.status(400).json({ error: "E-mail já cadastrado" });
      } else {
        console.error("Erro ao criar estudante:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
      return;
    }

    const newStudent: Student = {
      id,
      name: studentData.name,
      email: studentData.email,
      whatsapp: studentData.whatsapp,
      objective: studentData.objective,
      healthRestrictions: studentData.healthRestrictions || "",
      shift: studentData.shift,
      enrollmentDate,
      isEnrolled: false,
    };

    res.status(201).json(newStudent);
  });
});

// PUT /api/students/:id/enroll - Matricular estudante
router.put("/:id/enroll", (req, res) => {
  const { id } = req.params;
  const enrolledAt = new Date().toISOString();

  const sql = `
    UPDATE students 
    SET is_enrolled = 1, enrolled_at = ? 
    WHERE id = ?
  `;

  db.run(sql, [enrolledAt, id], function (err) {
    if (err) {
      console.error("Erro ao matricular estudante:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Estudante não encontrado" });
      return;
    }

    res.json({ message: "Estudante matriculado com sucesso", enrolledAt });
  });
});

// PUT /api/students/:id/unenroll - Desmatricular estudante
router.put("/:id/unenroll", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE students 
    SET is_enrolled = 0, enrolled_at = NULL 
    WHERE id = ?
  `;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erro ao desmatricular estudante:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Estudante não encontrado" });
      return;
    }

    res.json({ message: "Estudante desmatriculado com sucesso" });
  });
});

export default router;
