import { useState, useEffect } from "react";
import type { Student, StudentFormData } from "./types";
import { apiService, ApiError } from "./services/apiService";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StudentForm from "./components/StudentForm/StudentForm";
import StudentList from "./components/StudentList/StudentList";
import Notification from "./components/Notification/Notification";
import "./App.css";

interface NotificationState {
  message: string;
  type: "success" | "error" | "info" | "warning";
  show: boolean;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "success",
    show: false,
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setNotification({ message, type, show: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await apiService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erro ao carregar estudantes:", error);
        showNotification("Erro ao carregar a lista de estudantes", "error");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleAddStudent = async (studentData: StudentFormData) => {
    try {
      setLoading(true);
      const newStudent = await apiService.addStudent(studentData);
      setStudents((prev) =>
        [...prev, newStudent].sort(
          (a, b) =>
            new Date(a.enrollmentDate).getTime() -
            new Date(b.enrollmentDate).getTime()
        )
      );
      setShowForm(false);
      showNotification(
        `${studentData.name} foi adicionado à lista de espera!`,
        "success"
      );
    } catch (error) {
      console.error("Erro ao adicionar estudante:", error);
      if (error instanceof ApiError && error.status === 400) {
        showNotification(error.message, "error");
      } else {
        showNotification("Erro ao adicionar estudante à lista", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollStudent = async (id: string) => {
    const student = students.find((s) => s.id === id);
    try {
      setLoading(true);
      const result = await apiService.enrollStudent(id);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? { ...student, isEnrolled: true, enrolledAt: result.enrolledAt }
            : student
        )
      );
      if (student) {
        showNotification(
          `${student.name} foi matriculado com sucesso!`,
          "success"
        );
      }
    } catch (error) {
      console.error("Erro ao matricular estudante:", error);
      showNotification("Erro ao matricular estudante", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUnenrollStudent = async (id: string) => {
    const student = students.find((s) => s.id === id);
    try {
      setLoading(true);
      await apiService.unenrollStudent(id);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? { ...student, isEnrolled: false, enrolledAt: undefined }
            : student
        )
      );
      if (student) {
        showNotification(`${student.name} foi desmatriculado.`, "info");
      }
    } catch (error) {
      console.error("Erro ao desmatricular estudante:", error);
      showNotification("Erro ao desmatricular estudante", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main">
        <div className="toggleContainer">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`toggleButton ${showForm ? "secondary" : ""}`}
            disabled={loading}
          >
            {showForm ? "Ver Lista de Espera" : "Cadastrar Novo Aluno"}
          </button>
        </div>

        {loading && (
          <div
            style={{ textAlign: "center", color: "#d4af37", padding: "2rem" }}
          >
            Carregando...
          </div>
        )}

        {showForm ? (
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <StudentList
            students={students}
            onEnroll={handleEnrollStudent}
            onUnenroll={handleUnenrollStudent}
          />
        )}
      </main>

      <Footer />

      <Notification
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={hideNotification}
      />
    </div>
  );
}

export default App;
