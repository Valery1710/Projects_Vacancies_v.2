import { makeAutoObservable } from 'mobx';

class Db {
   //массив объектов в каждом объекте одтельный проект
  vacancies = JSON.parse(localStorage.getItem('vacanciesStore')) ? JSON.parse(localStorage.getItem('vacanciesStore')) : [];
  projects = JSON.parse(localStorage.getItem('projectStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];
  projectSelectedId =  JSON.parse(localStorage.getItem('projectSelected')) ?
  JSON.parse(localStorage.getItem('projectSelected')) : null
  vacancySelectedId =  JSON.parse(localStorage.getItem('vacancySelected')) ?
  JSON.parse(localStorage.getItem('vacancySelected')) : null


  constructor() {
    makeAutoObservable(this);
  }

  addVacancy(vacancy) {
    console.log('addItem')
    this.vacancies = JSON.parse(localStorage.getItem('vacanciesStore')) ? JSON.parse(localStorage.getItem('vacanciesStore')) : [];

    if (this.vacancies.some((el) => el.id === vacancy.id)) //проверка уникальности id вакансии
      {
        console.log("Vacancy with this id already exists!")
      }else{
        // создание новой вакансии
        console.log('создание новой вакансии')
      const newVacancy = { id: Date.now(), ...vacancy};
      this.vacancies.push(newVacancy);
      localStorage.setItem('vacanciesStore', JSON.stringify(this.vacancies));
 
      console.log('newVacancy',newVacancy)
      // если выбран конкретный проект => добавление id вакансии в список вакансий проекта
      console.log('projectSelectedId',this.projectSelectedId)
      if (this.projectSelectedId) {
        // получение массива с выбранным проектом
        console.log('projectSelectedId',this.projectSelectedId)
        this.projects = JSON.parse(localStorage.getItem('projectStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];
        const project = this.projects.filter((el)=>el.id === this.projectSelectedId)
        console.log('project',project) //массив с одним объектом project
        // project.vacancies.push(newVacancy.id)
        // добавление id созданной вакансии в выбранный проект
        project[0].vacancies.push(newVacancy.id)
        this.projects = this.projects.filter((el)=>el.id !== this.projectSelectedId)
        this.projects.push(project[0])
        localStorage.setItem('projectStore', JSON.stringify(this.projects));

      }
    }
  }

  removeVacancy(vacancy) {
    this.vacancies = JSON.parse(localStorage.getItem('vacanciesStore'));
    this.vacancies = this.vacancies.filter((el) => el.id !== vacancy);
    localStorage.setItem('vacanciesStore', JSON.stringify(this.vacancies));
  }

  updateVacancy(vacancy) {
    this.removeVacancy(vacancy.id)
    this.addVacancy(vacancy)
  }

  addProjectSelectedId(id) {
    
      console.log('ProjectSelected.addItem')
      console.log('id',id)
      this.projectSelectedId = id;
      localStorage.setItem('projectSelected', JSON.stringify(this.projectSelectedId)|| null);
      
    }
  addVacancySelectedId(id) {
    
      console.log('VacancySelected.addItem')
      console.log('id',id)
      this.vacancySelectedId = id;
      localStorage.setItem('vacancySelectedId', JSON.stringify(this.vacancySelectedId)|| null);
      
    }
  

}

const db = new Db();
export default db;
