import { useState, useEffect } from "react";
import type { Student, StudentFormData } from "./types";
import { storageService } from "./services/storageService";
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
    const storedStudents = storageService.getStudents();
    // Ordenar por data de cadastro (mais antigos primeiro)
    const sortedStudents = storedStudents.sort(
      (a, b) =>
        new Date(a.enrollmentDate).getTime() -
        new Date(b.enrollmentDate).getTime()
    );
    setStudents(sortedStudents);
  }, []);

  const handleAddStudent = (studentData: StudentFormData) => {
    const newStudent = storageService.addStudent(studentData);
    setStudents((prev) => {
      const updated = [...prev, newStudent];
      // Manter ordenação por data de cadastro
      return updated.sort(
        (a, b) =>
          new Date(a.enrollmentDate).getTime() -
          new Date(b.enrollmentDate).getTime()
      );
    });
    setShowForm(false);
    showNotification(
      `${studentData.name} foi adicionado à lista de espera!`,
      "success"
    );
  };

  const handleEnrollStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    const enrolledAt = new Date().toISOString();
    storageService.updateStudent(id, { isEnrolled: true, enrolledAt });
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isEnrolled: true, enrolledAt }
          : student
      )
    );
    if (student) {
      showNotification(
        `${student.name} foi matriculado com sucesso!`,
        "success"
      );
    }
  };

  const handleUnenrollStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    storageService.updateStudent(id, {
      isEnrolled: false,
      enrolledAt: undefined,
    });
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
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    storageService.deleteStudent(id);
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (student) {
      showNotification(`${student.name} foi removido da lista.`, "warning");
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
          >
            {showForm ? "Ver Lista de Espera" : "Entrar na Lista de Espera"}
          </button>
        </div>

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
            onDelete={handleDeleteStudent}
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
