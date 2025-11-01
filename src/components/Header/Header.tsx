import styles from "./Header.module.css";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  LogoComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Header = ({ logoSrc, logoAlt = "Logo", LogoComponent }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {LogoComponent ? (
        <div className={styles.logoContainer}>
          <LogoComponent className={styles.logo} />
        </div>
      ) : logoSrc ? (
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
