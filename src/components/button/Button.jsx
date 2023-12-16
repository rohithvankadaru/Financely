import React from 'react'
import './button.css'

const Button = ({ onClick, text, blue, disabled }) => {
  return (
    <button
      className={blue ? 'btn btn-blue' : 'btn'}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;