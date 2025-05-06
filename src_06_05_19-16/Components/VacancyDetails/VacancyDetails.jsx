import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './VacancyDetails.module.css';
import Menu from '../Menu/Menu';
import projectsStore from '../../store/ProjectsStore';
import projectSelected from '../../store/ProjectSelected';
import db from '../../store/Db';

const VacancytDetails = ({id}) => {
  // const [field, setField] = useState(projectsStore.id);
  // const [experience, setExperience] = useState('More 2 years');
  // const [deadline, setDeadline] = useState('2024-11-22');
  // const [description, setDescription] = useState(
  //   "We are looking for a creative and detail-oriented designer to develop eye-catching and engaging visual materials for our social media platforms. The goal is to create content that aligns with our brand identity and effectively captures our audience's attention."
  // );
  const vacancyForDisplay = db.vacancies.filter(el=>el.id === db.vacancySelectedId)
  // Внимание в projectForDisplay - Array с одним элементом - объектом с данными выбранного проекта
    const [formData, setFormData] = useState(vacancyForDisplay[0]);
    console.log('formData',formData)






  console.log('vacancyForDisplay',vacancyForDisplay)
  const handleAddVacancy = () => {
    console.log('Вакансия добавлена!');
  };

  const handleDeleteProject = () => {
    console.log('Проект удалён!');
    projectsStore.removeItem(projectSelected.item)
  };
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
          <h1>{formData.name}</h1>
         
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
