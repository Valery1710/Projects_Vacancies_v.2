import React from 'react'
import styles from './Tooltip.module.css'; 

function ToolTip() {
  return (
    <div>
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  )
}

export default ToolTip
