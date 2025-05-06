import React, { useState , useEffect }  from 'react';

import { Link } from 'react-router-dom';
import styles from './CreateProject.module.css';
import Menu from '../Menu/Menu';
import projectsStore from '../../store/ProjectsStore';
import db from '../../store/Db'
const CreateProject = () => {
  useEffect(() => {
    showPopup('Input project Name');
  },[])
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    experience: '',
    deadline: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  //Sent data from Form to backend
  const createProject = async (projectData) => {
    try {
      const response = await fetch('http://localhost:8080/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Created project:', data);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  //**Sent data from Form to backend

  
//add value from field to formData object
  const handleChange = (e) => {
    if (!formData.name && e.target.name !== "name") {
      showPopup('First fill in the project Name field');
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const showPopup = (message) => {
    setIsPopupVisible(true);

    setErrorMessage(message);
    console.log('Start popup');
    setTimeout(() => {
      setIsPopupVisible(false);
      console.log('Stop popup');
    }, 3000); // Close popup after 3 seconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  // name is required
    if (!formData.name) {
      console.log('Project name required!!!');
    } else {
 //POST to backend
      // createProject(formData); // uncomment if backend available
   
      db.addProject(formData);
      // projectsStore.addItem(formData);
    }
  };

  const handleOnClick = () => {
    createProject(formData);
  };

  return (
    <div className={styles.container}>
      <Menu />

      {/* Main Content */}
      <main className={styles.main}>
        <h2 className={styles.title}>Creating project</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Project name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label>Field</label>
              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
              >
                <option value="">Select field</option>
                
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="Required experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe the project..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            // className={styles.submitButton}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            <Link to="/" className={styles.btn_link}>Create project </Link>
          </button>
        </form>
        {/* <Link to="/"> */}
        {/* <button type="submit" className={handleOnClick}>
              Create project
            </button> */}
        {/* </Link> */}
      </main>

      {isPopupVisible && <div className={styles.popup}>{errorMessage}</div>}
    </div>
  );
};

export default CreateProject;
