import React from 'react'
import styles from './Header.module.css'
import img from '../../Imgs/Menu.png'
function Header() {
  return (
    <div className={styles.image_container}>
    {/* <img src="../../Imgs/Menu.png" alt="Описание изображения"/> */}
    <img src={img} alt="Описание изображения" />
  </div>
  )
}

export default Header
