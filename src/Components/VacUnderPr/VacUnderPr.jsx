import React from 'react';

import { Link } from "react-router-dom";
import db from '../../store/Db';
import styles from './VacUnderPr.module.css'; // Импортируем CSS-модуль

const VacUnderPr = ({ id,name, field, country, description }) => {
  const getFormattedText = (input) => {
    const textLen = 35
    if (input.length > textLen) {
      return input.slice(0, textLen) + '...'; // Добавляем три точки
    }
    return input; // Возвращаем текст без изменений
  }

  return (
    
    <div className={styles.myComponent} onClick={() => db.addVacancySelectedId(id)}>
      <Link to="/vacancydetails" className={styles.myComponent}>
      <span className={`${styles.item} ${styles.name}`}>Vacancion - {name}</span>
      <span className={styles.item}>Field - {field}</span>
      <span className={styles.item}>Country - {country}</span>
      <span className={`${styles.item} ${styles.description}`}>description - {description}</span>
      </Link>
    </div>
    
  );
  ////////////////
}
export default VacUnderPr;
