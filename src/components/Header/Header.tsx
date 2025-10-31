import styles from "./Header.module.css";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
}

const Header = ({ logoSrc, logoAlt = "Logo" }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {logoSrc ? (
        <div className={styles.logoContainer}>
          <img src={logoSrc} alt={logoAlt} className={styles.logo} />
        </div>
      ) : (
        <h1 className={styles.title}>Lista de Espera - Matrículas</h1>
      )}
    </header>
  );
};

export default Header;
