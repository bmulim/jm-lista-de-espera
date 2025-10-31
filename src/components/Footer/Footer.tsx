import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.content}>
        Sistema de <span className={styles.highlight}>Lista de Espera</span>{" "}
        para Matrículas
      </p>
      <p className={styles.year}>
        © {currentYear} - Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
