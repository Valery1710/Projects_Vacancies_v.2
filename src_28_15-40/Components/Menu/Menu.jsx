import React from 'react'
import { Link } from "react-router-dom";
import styles from './Menu.module.css'

function Menu() {
  return (
    <aside className={styles.sidebar}>
    <h2 className={styles.logo}>TROOD COMMUNITY</h2>
    <nav className={styles.nav}>
    <Link to="/">
      <button className={styles.color}>Main Page</button>
      </Link>
      <Link to="/createproject">
      <button >Projects</button>
      </Link>
      <Link to="/listvacancies">
      <button>Vacancies</button>
      </Link>
      
      <button>People</button>
      <button>Settings</button>
    </nav>
  </aside>
  )
}

export default Menu
