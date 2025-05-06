import { makeAutoObservable } from 'mobx';

class ProjectsStore {
   //массив объектов в каждом объекте одтельный проект
  items = JSON.parse(localStorage.getItem('projectStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];
  constructor() {
    makeAutoObservable(this);
  }

  addItem(item) {
    console.log('addItem')
    this.items = JSON.parse(localStorage.getItem('projectStore')) ? JSON.parse(localStorage.getItem('projectStore')) : [];
    if (!this.items.some((el) => el.id === item.id)) {
      const newProject = { id: Date.now(), vacancies:[],...item};
      this.items.push(newProject);
      localStorage.setItem('projectStore', JSON.stringify(this.items));
    }
  }

  removeItem(id) {
    console.log('id', id);
    console.log('len', this.items.length);
    this.items = JSON.parse(localStorage.getItem('projectStore'));
    this.items = this.items.filter((item) => item.id !== id);
    localStorage.setItem('projectStore', JSON.stringify(this.items));
  }

  updateItem(item) {
    this.removeItem(item.id)
    this.addItem(item)
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const projectsStore = new ProjectsStore();
export default projectsStore;
