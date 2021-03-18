import React from 'react';
import styles from './page-not-found.module.css';

export const PageNotFound: React.FC = () => {
  return (
    <body>
      <div className={styles.page_not_found}>
        <h1>404</h1>
        <h3>Page not found</h3>
      </div>
    </body>
  );
};
