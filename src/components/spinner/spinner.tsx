import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.holder}>
      <div className={`${styles['flip-preloader']}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
