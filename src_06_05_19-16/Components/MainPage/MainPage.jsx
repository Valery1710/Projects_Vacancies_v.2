import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './MainPage.module.css';
import ProjectCard from '../ProjectCard/ProjectCard';
import Menu from '../Menu/Menu';

// const ProjectCard = ({ title, tasks }) => (
//   <div className={styles.projectCard}>
//     <h3>{title}</h3>
//     <p>{title}</p>

//   </div>
// );

const MainPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const activeProjects = projects.filter(p => !p.isCompleted);
  const passedProjects = projects.filter(p => p.isCompleted);

  return (
    <div className={styles.container}>
      <Menu/>
 

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h2>Active projects MainPage</h2>
          <Link to="/createproject"></Link>
          <button className={styles.createBtn}>Create project</button>
          </Link>
        </div>
        <div className={styles.projectList}>
          {activeProjects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.name}
              tasks={project.tasks || ['Sample task 1', 'Sample task 2']}
            />
          ))}
        </div>

        <h2 className={styles.sectionTitle}>Passed projects</h2>
        <div className={styles.projectList}>
          {passedProjects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.name}
              tasks={project.tasks || ['Sample task 1', 'Sample task 2']}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
