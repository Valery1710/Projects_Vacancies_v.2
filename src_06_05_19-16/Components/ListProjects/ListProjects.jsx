import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import styles from './ListProjects.module.css';
import ProjectCard from '../ProjectCard/ProjectCard';
import Menu from '../Menu/Menu';
// import projectsStore from '../../store/ProjectsStore';
import db from '../../store/Db';

const isDateInThePast = (dateString) => {
  if (!dateString) return false; // Если дата не выбрана, возвращаем false
  const selectedDate = new Date(dateString);
  const currentDate = new Date();
  
  // Устанавливаем время текущей даты на полночь для корректного сравнения
  currentDate.setHours(0, 0, 0, 0);
  
  return selectedDate < currentDate; // Сравниваем даты
};

const ListProjects = () => {
  db.update()

  const projectsArr = db.projects;
  // const projectsArr = projectsStore.items;

  console.log('projectsArr', projectsArr.length);

  const activeProjects = projectsArr.filter((p) => !isDateInThePast(p.deadline));
  const passedProjects = projectsArr.filter((p) => isDateInThePast(p.deadline));


  return (
    <div className={styles.container}>
      <Menu />

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>Active projects</h2>
          <Link to="/createproject" className={styles.btn_link}>
          <button className={styles.createBtn}>Create project</button>
          </Link>
        </div>
        <div className={styles.projectList}>
          {activeProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              id={project.id}
              field={project.field}
              deadline={project.deadline}
              isCompleted={project.isCompleted}
              tasks={project.description || ['Sample task 1', 'Sample task 2']}
            />
          ))}
        </div>

        <h2 className={styles.title}>Passed projects</h2>
        <div className={styles.projectList}>
          {passedProjects.map((project) => (
            
            <ProjectCard
            key={project.id}
            title={project.name}
            id={project.id}
            field={project.field}
            deadline={project.deadline}
            isCompleted={project.isCompleted}
            tasks={project.description || ['Sample task 1', 'Sample task 2']}
          />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListProjects;
