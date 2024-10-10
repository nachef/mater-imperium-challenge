import { IUserInfoProps } from "./types";
import styles from "./styles.module.css";
import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";

export function UserInfo({ name, email, photo }: IUserInfoProps) {
  return (
    <div className={styles.container}>
      <Image
        src={photo}
        className={styles.photo}
        alt={"User photo"}
        width={40}
        height={40}
      />
      <div className={styles.user_details}>
        <span className={styles.name}>{name}</span>
        <span className={styles.email}>{email}</span>
      </div>
      <a className={styles.logout} href="#">
        <FaSignInAlt />
      </a>
    </div>
  );
}
