import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ListProjects.module.css';
// import styles from './ListVacancies.module.css';
import VacancyCard from '../VacancyCard/VacancyCard';

import Menu from '../Menu/Menu';

import db from '../../store/Db';


// const isDateInThePast = (dateString) => {
//   if (!dateString) return false; // Если дата не выбрана, возвращаем false
//   const selectedDate = new Date(dateString);
//   const currentDate = new Date();

//   // Устанавливаем время текущей даты на полночь для корректного сравнения
//   currentDate.setHours(0, 0, 0, 0);

//   return selectedDate < currentDate; // Сравниваем даты
// };

const ListVacancies = () => {
   db.projectSelectedId = null
  // const [projects, setProjects] = useState([projectsStore.items]);

  // projects.map((el) => {
  //   projectsStore.addItem(el);
  // });

  // const vacanciesArr = vacancyStore.items;
  const vacanciesArr = db.vacancies;

  

  const activeVacancies = vacanciesArr
  // const passedProjects = vacanciesArr.filter((p) => isDateInThePast(p.deadline));

  return (
    <div className={styles.container}>
      <Menu />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Vacancies</h2>
          <Link to="/createvacancy" className={styles.btn_link}>
            <button className={styles.createBtn}>Create vacation</button>
          </Link>
        </div>
        <div className={styles.projectList}>
          {activeVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.name}
              id={vacancy.id}
              field={vacancy.field}
              country={vacancy.country}
              usedInProjectsId={vacancy.projects ? vacancy.projects :[]}
              
              tasks={vacancy.description || ['Sample task 1', 'Sample task 2']}
            />
          ))}
        </div>


      </main>
    </div>
  );
};

export default ListVacancies;
