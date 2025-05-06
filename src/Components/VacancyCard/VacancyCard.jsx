import React from 'react'
import { Link } from "react-router-dom";
import styles from './VacancyCard.module.css';

import db from '../../store/Db';

const getFormattedText = (input) => {
  const textLen = 35
  if (input.length > textLen) {
    return input.slice(0, textLen) + '...'; // Добавляем три точки
  }
  return input; // Возвращаем текст без изменений
}

const VacancyCard = ({ id,title, tasks, field, country, usedInProjectsId }) => {
  console.log('usedInProjectsId',usedInProjectsId)
  const usedInProject = db.projects.filter((pr)=> usedInProjectsId.includes(pr.id))
const usedInProjectName = usedInProject[0].name
  return(

  <div className={styles.projectCard} onClick={() => db.addVacancySelectedId(id)}>
  {/* <div className={styles.projectCard} onClick={() => projectSelected.addItem(id)}> */}
    <Link to="/vacancydetails" >
    <h3>Name: {title}</h3>
    <p>for project - <b>{usedInProjectName}</b></p>
    <p>Id: {id}</p>
    <p>Field: {field}</p>
    <p>Country: {country}</p>
    <p>Description: {getFormattedText(tasks)}</p>
    
    </Link>
  </div>
)};


export default VacancyCard
