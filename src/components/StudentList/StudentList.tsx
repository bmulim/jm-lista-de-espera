import type { Student } from "../../types";
import styles from "./StudentList.module.css";

interface StudentListProps {
  students: Student[];
  onEnroll: (id: string) => void;
  onUnenroll: (id: string) => void;
}

const StudentList = ({
  students,
  onEnroll,
  onUnenroll,
}: StudentListProps) => {
  if (students.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Lista de Espera</h2>
        <div className={styles.emptyMessage}>
          Nenhum aluno cadastrado na lista de espera.
        </div>
      </div>
    );
  }

  const enrolledCount = students.filter((student) => student.isEnrolled).length;
  const waitingCount = students.filter((student) => !student.isEnrolled).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getShiftLabel = (shift: string) => {
    const labels = {
      morning: "Manhã",
      afternoon: "Tarde",
      evening: "Noite",
    };
    return labels[shift as keyof typeof labels] || shift;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Espera</h2>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{waitingCount}</span>
          <span className={styles.statLabel}>Aguardando</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{enrolledCount}</span>
          <span className={styles.statLabel}>Matriculados</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{students.length}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
      </div>

      {students.map((student, index) => (
        <div
          key={student.id}
          className={`${styles.studentCard} ${
            student.isEnrolled ? styles.enrolled : ""
          }`}
        >
          <div className={styles.studentHeader}>
            <div className={styles.studentInfo}>
              <h3 className={styles.studentName}>{student.name}</h3>
              {!student.isEnrolled && (
                <div className={styles.positionBadge}>
                  Posição: {index - enrolledCount + 1}º na fila
                </div>
              )}
              <div className={styles.enrollmentDate}>
                Cadastrado em: {formatDate(student.enrollmentDate)}
                {student.isEnrolled && student.enrolledAt && (
                  <span>
                    {" "}
                    • Matriculado em: {formatDate(student.enrolledAt)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.studentDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>E-mail</span>
              <span className={styles.detailValue}>{student.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>WhatsApp</span>
              <span className={styles.detailValue}>{student.whatsapp}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Turno</span>
              <span className={`${styles.shiftBadge} ${styles[student.shift]}`}>
                {getShiftLabel(student.shift)}
              </span>
            </div>
          </div>

          <div className={styles.objectiveSection}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Objetivo</span>
              <span className={styles.detailValue}>{student.objective}</span>
            </div>
          </div>

          {student.healthRestrictions && (
            <div className={styles.healthRestrictionsSection}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Restrições de Saúde</span>
                <span className={styles.detailValue}>
                  {student.healthRestrictions}
                </span>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            {student.isEnrolled ? (
              <button
                onClick={() => onUnenroll(student.id)}
                className={`${styles.button} ${styles.unenrollButton}`}
              >
                Desmatricular
              </button>
            ) : (
              <button
                onClick={() => onEnroll(student.id)}
                className={`${styles.button} ${styles.enrollButton}`}
              >
                Matricular
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
