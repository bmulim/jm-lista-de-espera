import { useState } from "react";
import type { StudentFormData } from "../../types";
import styles from "./StudentForm.module.css";

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  onCancel?: () => void;
}

const StudentForm = ({ onSubmit, onCancel }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    whatsapp: "",
    objective: "",
    healthRestrictions: "",
    shift: "morning",
  });

  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (
      !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.whatsapp) &&
      !/^\d{10,11}$/.test(formData.whatsapp.replace(/\D/g, ""))
    ) {
      newErrors.whatsapp =
        "WhatsApp deve ter formato válido ex: (11) 99999-9999";
    }

    if (!formData.objective.trim()) {
      newErrors.objective = "Objetivo é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        objective: "",
        healthRestrictions: "",
        shift: "morning",
      });
      setErrors({});
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof StudentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));

    if (errors.whatsapp) {
      setErrors((prev) => ({ ...prev, whatsapp: undefined }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Entrar na fila de espera</h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Nome Completo <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Digite o nome completo"
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            E-mail <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="email@exemplo.com"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            WhatsApp <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleWhatsAppChange}
            className={styles.input}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {errors.whatsapp && (
            <span className={styles.error}>{errors.whatsapp}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Turno Preferido <span className={styles.required}>*</span>
          </label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="morning">Manhã</option>
            <option value="afternoon">Tarde</option>
            <option value="evening">Noite</option>
          </select>
        </div>

        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
          <label className={styles.label}>
            Objetivo <span className={styles.required}>*</span>
          </label>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Descreva seu objetivo com as aulas..."
            rows={3}
          />
          {errors.objective && (
            <span className={styles.error}>{errors.objective}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
          <label className={styles.label}>Restrições de Saúde</label>
          <textarea
            name="healthRestrictions"
            value={formData.healthRestrictions}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Descreva qualquer restrição de saúde (opcional)..."
            rows={3}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.button}>
          Cadastrar na Lista
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
