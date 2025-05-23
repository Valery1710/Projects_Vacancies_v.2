import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './VacancyDetails.module.css';
import Menu from '../Menu/Menu';
import projectsStore from '../../store/ProjectsStore';
import projectSelected from '../../store/ProjectSelected';
import db from '../../store/Db';

const VacancytDetails = ({id}) => {
console.log('vacancySelectedId',db.vacancySelectedId)
  const vacancyForDisplay = db.vacancies.filter(el=>el.id === db.vacancySelectedId)
  console.log('vacancyForDisplay',vacancyForDisplay)
  // Внимание в projectForDisplay - Array с одним элементом - объектом с данными выбранного проекта
    const [formData, setFormData] = useState(vacancyForDisplay[0]);
    console.log('formData',formData)
    const project = db.projects.filter((pr)=>pr.vacancies.includes(db.vacancySelectedId))
    console.log('project',project)
    const projectName = project[0].name

  console.log('vacancyForDisplay',vacancyForDisplay)
  // const handleAddVacancy = () => {
  //   console.log('Вакансия добавлена!');
  // };

  // const handleDeleteProject = () => {
  //   console.log('Проект удалён!');
  //   projectsStore.removeItem(projectSelected.item)
  // };
  const handleCloseVacation = () => {
    console.log('Вакансия закрыта!');
    console.log('db.vacancySelectedId',db.vacancySelectedId)
    
    db.removeVacancy(db.vacancySelectedId)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click Update button');
    console.log(formData); // Выводим объект в консоль
    // createProject(formData); // POST to backend
    db.updateVacancy({...formData})
    // projectsStore.updateItem({...formData})
    // projectsStore.addItem(formData)
    };

  return (
    <div className={styles.container}>
      <Menu />


      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Vacancy - {formData.name}</h1>
          <h2>for project - {projectName}</h2>
         
          <button className={styles.deleteBtn} onClick={handleCloseVacation}>
          <Link to='/listvacancies'>  Close vacancy </Link>
          </button>
          
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
             
              <label>Field</label>
              <select
                name="field"
                value={formData.field || vacancyForDisplay[0].field}
                onChange={handleChange}
                
              >
                <option value=""></option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Experience</label>
              <input
                type="text"
                value={formData.experience}
                // onChange={(e) => setExperience(e.target.value)}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <button type="submit" className={styles.submitButton} onClick={handleSubmit} >
            <Link to='/listvacancies'>Update vacancy </Link>
            </button>
        </form>
      </main>
    </div>
  );
};

export default VacancytDetails;
