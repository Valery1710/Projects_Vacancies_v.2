import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ListVacUnderProject.module.css';
// import VacancyCard from '../VacancyCard/VacancyCard';

import VacUnderPr from '../VacUnderPr/VacUnderPr';
import db from '../../store/Db';

const isDateInThePast = (dateString) => {
  if (!dateString) return false; // Если дата не выбрана, возвращаем false
  const selectedDate = new Date(dateString);
  const currentDate = new Date();

  // Устанавливаем время текущей даты на полночь для корректного сравнения
  currentDate.setHours(0, 0, 0, 0);

  return selectedDate < currentDate; // Сравниваем даты
};

const ListVacanciesForProject = () => {
  // const [projects, setProjects] = useState([projectsStore.items]);

  // projects.map((el) => {
  //   projectsStore.addItem(el);
  // });

  // const projectsArr = vacancyStore.items;
  const projectsArr = db.vacancies;

  console.log('projectsArr', projectsArr.length);

  const activeProjects = projectsArr.filter(
    (p) => !isDateInThePast(p.deadline)
  );
  // const passedProjects = projectsArr.filter((p) => isDateInThePast(p.deadline));
  const projectForDisplay = db.projects.filter(
    (el) => el.id === db.projectSelectedId
  );
const vacanciesInProject = db.vacancies.filter((vacancy)=>projectForDisplay[0].vacancies.includes(vacancy.id))

  return (
    <>

      {vacanciesInProject.map((vacancy, index) => (
      // {db.vacancies.map((project, index) => (
        <div className={styles.container}>
 
          <VacUnderPr
            key={vacancy.id}
            name={vacancy.name}
            id={vacancy.id}
            field={vacancy.field}
            country={vacancy.country}
            description={
              vacancy.description || ['Sample task 1', 'Sample task 2']
            }
          />
        </div>
      ))}
    </>
  );
};

export default ListVacanciesForProject;
