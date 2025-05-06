import { makeAutoObservable } from "mobx";

class ProjectSelected {

  // item = null;
  item =  JSON.parse(localStorage.getItem('projectSelected')) ?
  JSON.parse(localStorage.getItem('projectSelected')) : null
 

  constructor() {
    makeAutoObservable(this);
  }

  addItem(id) {
    console.log('ProjectSelected.addItem')
    console.log('item',id)
    this.item = id;
    localStorage.setItem('projectSelected', JSON.stringify(this.item)|| null);
    
  }

  deleteItem(){
    this.item = null
  }

}

const projectSelected = new ProjectSelected();
export default projectSelected;