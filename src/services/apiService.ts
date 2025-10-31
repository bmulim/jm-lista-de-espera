import type { Student, StudentFormData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Erro desconhecido" }));
    throw new ApiError(
      error.error || "Erro na requisição",
      response.status,
      error
    );
  }
  return response.json();
};

export const apiService = {
  getStudents: async (): Promise<Student[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao recuperar estudantes:", error);
      throw error;
    }
  },

  addStudent: async (student: StudentFormData): Promise<Student> => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao adicionar estudante:", error);
      throw error;
    }
  },

  enrollStudent: async (
    id: string
  ): Promise<{ message: string; enrolledAt: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}/enroll`, {
        method: "PUT",
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao matricular estudante:", error);
      throw error;
    }
  },

  unenrollStudent: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}/unenroll`, {
        method: "PUT",
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao desmatricular estudante:", error);
      throw error;
    }
  },

  deleteStudent: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: "DELETE",
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao remover estudante:", error);
      throw error;
    }
  },
};

export { ApiError };
