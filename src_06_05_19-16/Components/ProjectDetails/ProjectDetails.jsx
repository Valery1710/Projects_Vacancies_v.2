import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectDetails.module.css';
import Menu from '../Menu/Menu';
import ListVacanciesForProject from '../ListVacUnderProject/ListVacUnderProject';

import projectsStore from '../../store/ProjectsStore';
import projectSelected from '../../store/ProjectSelected';
import db from '../../store/Db';

const ProjectDetails = ({ id }) => {
  // const [field, setField] = useState(projectsStore.id);
  // const [experience, setExperience] = useState('More 2 years');
  // const [deadline, setDeadline] = useState('2024-11-22');
  // const [description, setDescription] = useState(
  //   "We are looking for a creative and detail-oriented designer to develop eye-catching and engaging visual materials for our social media platforms. The goal is to create content that aligns with our brand identity and effectively captures our audience's attention."
  // );
  db.update()

  // const projectForDisplay = projectsStore.items.filter(
  const projectForDisplay = db.projects.filter(
    (el) => el.id === db.projectSelectedId
  );
  console.log('projectForDisplay.id',projectForDisplay[0].id)
  console.log('projectForDisplay.vacancies',projectForDisplay[0].vacancies)

  // Внимание в projectForDisplay - Array с одним элементом - объектом с данными выбранного проекта
  const [formData, setFormData] = useState(projectForDisplay[0]);
  console.log('formData', formData);
  // const projectForDisplay = projectsStore.items.filter(el=>el.id === projectSelected.item)
  //   const [formData, setFormData] = useState({
  //     name: '',
  //     field: '',
  //     experience: '',
  //     deadline: '',
  //     description: '',
  //     isCompleted:false
  //   });



  const handleDeleteProject = () => {
   
    projectsStore.removeItem(projectSelected.item);
    // projectsStore.removeItem(projectSelected.item);
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
    projectsStore.updateItem({ ...formData });
    // projectsStore.addItem(formData)
  };

  return (
    <>
    <div className={styles.container}>
      <Menu />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>{formData.name || null}</h1>
          <Link to="/">
            <button className={styles.deleteBtn} onClick={handleDeleteProject}>
              Delete project
            </button>
          </Link>
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Field</label>
              <select
                name="field"
                value={formData.field || projectForDisplay[0].field}
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
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            <Link to="/">Update project </Link>
          </button>
          <button className={styles.addBtn}>
            <Link to="/createvacancy">Add vacancy</Link>
          </button>
        </form>

      </main>
      
      </div>
      {
        projectForDisplay[0].vacancies.length > 0 ? 
        // projectForDisplay[0].vacancies.map((el)=>
        <ListVacanciesForProject name='test'/> :
        <h1 className={styles.message}>
There are no vacancies for this project.</h1>
      }
      
    </>
  );
};

export default ProjectDetails;
