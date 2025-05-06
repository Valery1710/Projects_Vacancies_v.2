import React from 'react';
import './MyComponent.css'; // Импортируем CSS файл

const MyComponent = ({ title, id, fieldB }) => {
  return (
    <div className="container">
      <div className="title-id">
        <h1>title{title}</h1>
        <span>id{id}</span>
      </div>
      <div className="field-b">
      fieldB{fieldB}
      </div>
    </div>
  );
};

export default MyComponent;