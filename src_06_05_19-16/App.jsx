import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ListProjects from './Components/ListProjects/ListProjects';
import ListVacancies from './Components/ListVacancies/ListVacancies';
import CreateProject from './Components/CreateProject/CreateProject';
import CreateVacancy from './Components/CreateVacancy/CreateVacancy';
import VacancytDetails from './Components/VacancyDetails/VacancyDetails';
import UpdateProject from './Components/UpdateProject/UpdateProject';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import Header from './Components/Header/Header';
function App() {
  return (
    <div>
    
<Header/>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ListProjects />} />
          <Route path="/listvacancies" element={<ListVacancies />} />

          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/createvacancy" element={<CreateVacancy />} />

          <Route path="/projectdetails" element={<ProjectDetails />} />
          <Route path="/vacancydetails" element={<VacancytDetails />} />

          <Route path="/my_react_app" element={<CreateProject />} />
          <Route path="*" element={<ListProjects />} />
         
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
