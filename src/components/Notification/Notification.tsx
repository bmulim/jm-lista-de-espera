import { useEffect } from "react";
import styles from "./Notification.module.css";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification = ({
  message,
  type,
  show,
  onClose,
  duration = 3000,
}: NotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${
        show ? styles.show : ""
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
