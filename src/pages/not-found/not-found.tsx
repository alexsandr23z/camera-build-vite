import React from 'react';
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';


function NotFound(): React.JSX.Element {
  return (
    <div className="not-found">
      <div className={`${styles.notFound}`}>
        <h1 className={`${styles.notFoundTitle}`}>404</h1>
        <Link className={`${styles.notFoundTitleLink}`} to="/">
          <span className={`${styles.notFoundDescription}`}>
            Возвращайся на главную, ошибка при вводе адресной строки!!!
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
