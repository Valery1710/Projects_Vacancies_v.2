import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreateProject.module.css';
import Menu from '../Menu/Menu';
import vacancyStore from '../../store/Db';
import db from '../../store/Db';

const CreateVacancy = () => {
    useEffect(() => {
      showPopup('Input vacancy Name');
    },[])
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    experience: '',
    country: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // //Sent data from Form to backend
  // const createVacancy = async (projectData) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/vacancies', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(projectData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     console.log('Created project:', data);
  //   } catch (error) {
  //     console.error('Error creating project:', error);
  //   }
  // };
  // //**Sent data from Form to backend

  const handleChange = (e) => {
    console.log('e.name', e.target.name);
    if (!formData.name && e.target.name !== 'name') {
      showPopup('First fill in the vacancy Name field');
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
    }, 3000); // Скрыть попап через 2 секунды
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData.name', formData.name);
    if (!formData.name) {
      console.log('Vacancy name required!!!');
    } else {

      db.addVacancy(formData);
      setFormData(({
        name: '',
        field: '',
        experience: '',
        country: '',
        description: '',
      }))

    }
  };



  return (
    <div className={styles.container}>
      <Menu />

      {/* Main Content */}
      <main className={styles.main}>
        <h2 className={styles.title}>Creating vacancy</h2>

        {/* <form className={styles.form} onSubmit={handleSubmit}> */}
        <form className={styles.form} >
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Vacancy name"
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
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe the vacancy..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            <Link to="/listvacancies">Create vacancy </Link>
          </button>
        </form>
 
      </main>

      {isPopupVisible && <div className={styles.popup}>{errorMessage}</div>}
    </div>
  );
};

export default CreateVacancy;
