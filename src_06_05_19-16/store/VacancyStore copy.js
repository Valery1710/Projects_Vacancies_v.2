import { makeAutoObservable } from 'mobx';

class VacancyStore {
   //массив объектов в каждом объекте одтельный проект
  items = JSON.parse(localStorage.getItem('vacanciesStore')) ? JSON.parse(localStorage.getItem('vacanciesStore')) : [];
  projects = JSON.parse(localStorage.getItem('projectStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];
  projectSelectedId =  JSON.parse(localStorage.getItem('projectSelected')) ?
  JSON.parse(localStorage.getItem('projectSelected')) : null


  constructor() {
    makeAutoObservable(this);

  }

  addItem(vacancy) {
    console.log('addItem')
    this.items = JSON.parse(localStorage.getItem('vacanciesStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];

    if (this.items.some((el) => el.id === vacancy.id)) //проверка уникльности id вакансии
      {
        console.log("Vacancy with this id already exists!")
      }else{
        // создание новой вакансии
      const newVacancy = { id: Date.now(), ...vacancy};
      this.items.push(newVacancy);
      localStorage.setItem('vacanciesStore', JSON.stringify(this.items));
      // если выбран конкретный проект => добавление id вакансии в список вакансий проекта
      if (this.projectSelectedId) {
        const project = this.projects.filter((el)=>el.id === this.projectSelectedId)
        console.log('project',project)

        // project.vacancies.push(newVacancy.id)
        project[0].vacancies.push(10)
       
      }
    }
  }

  updateProject(projects) {

  }

  removeItem(id) {

    this.items = JSON.parse(localStorage.getItem('vacanciesStore'));
    this.items = this.items.filter((item) => item.id !== id);
    localStorage.setItem('vacanciesStore', JSON.stringify(this.items));
  }

  updateItem(item) {
    this.removeItem(item.id)
    this.addItem(item)
  }


}

const vacancyStore = new VacancyStore();
export default vacancyStore;
