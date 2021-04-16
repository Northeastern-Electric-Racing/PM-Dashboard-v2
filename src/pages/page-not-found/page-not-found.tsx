import styles from './page-not-found.module.css';

export const PageNotFound: React.FC = () => {
  return (
    <div className={`pt-5 ${styles.page_not_found}`}>
      <h1 className={styles.title}>404</h1>
      <h3 className={styles.subtitle}>Page not found</h3>
    </div>
  );
};
