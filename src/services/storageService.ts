import type { Student } from "../types";

const STORAGE_KEY = "jm-lista-espera-students";

export const storageService = {
  getStudents: (): Student[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao recuperar dados do localStorage:", error);
      return [];
    }
  },

  saveStudents: (students: Student[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error);
    }
  },

  addStudent: (
    student: Omit<Student, "id" | "enrollmentDate" | "isEnrolled">
  ): Student => {
    const students = storageService.getStudents();
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      enrollmentDate: new Date().toISOString(),
      isEnrolled: false,
    };

    const updatedStudents = [...students, newStudent];
    storageService.saveStudents(updatedStudents);
    return newStudent;
  },

  updateStudent: (id: string, updates: Partial<Student>): void => {
    const students = storageService.getStudents();
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, ...updates } : student
    );
    storageService.saveStudents(updatedStudents);
  },

  deleteStudent: (id: string): void => {
    const students = storageService.getStudents();
    const updatedStudents = students.filter((student) => student.id !== id);
    storageService.saveStudents(updatedStudents);
  },
};
