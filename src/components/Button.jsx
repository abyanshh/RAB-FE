// components/Button.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  children,
  to,
  href,
  onClick,
  className,
  variant = 'orange',
  rounded = true,
  as = 'button',
  ...props
}) => {
  const baseStyle = `
    font-semibold
    py-2 px-4
    border
    transition duration-200
    rounded-full
    ${className}
  `

  const variants = {
    orange: 'bg-white text-orange-500 border-orange-500 hover:bg-orange-200 hover:text-orange-600',
    blue: 'bg-white text-cyan-500 border-cyan-500 hover:bg-cyan-100 hover:text-cyan-600',
    gray: 'bg-white text-gray-600 border-gray-400 hover:bg-gray-100 hover:text-gray-700',
  }

  if (as === 'link' && to) {
    return (
      <Link to={to} className={baseStyle + ' ' + variants[variant]} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={baseStyle + ' ' + variants[variant]} {...props}>
      {children}
    </button>
  )
}

export default Button
