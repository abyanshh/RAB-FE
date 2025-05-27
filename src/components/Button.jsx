import { Link } from 'react-router-dom'

const Button = ({
  children,
  key,
  to,
  onClick,
  className,
  variant,
  as = 'button',
  ...props
}) => {
  const baseStyle = `
    font-semibold
    transition duration-200
    rounded-full
    ${className}
  `

  const variants = {
    menu: `
      bg-white 
      text-cyan-600 
      hover:bg-slate-200 
      hover:text-cyan-800
      py-2 px-2   
    `,
    disorderlist:  `
      flex 
      items-center 
      px-5 py-4 
      rounded-lg 
      text-left 
    `,
    orange: `
      border
      bg-white 
      text-orange-500 
      border-orange-500 
      hover:bg-orange-100 
      hover:text-orange-600
      py-2 px-4
    `,
    red: `
      border 
      bg-white 
      text-red-600 
      border-red-500 
      hover:bg-red-100 
      hover:text-red-800
      py-2 px-4
    `,
    blue: `
      border 
      bg-white 
      text-cyan-600 
      border-cyan-500
      hover:bg-cyan-100 
      hover:text-cyan-800
      py-2 px-4
    `,
    green: `
      border 
      bg-white 
      text-green-600 
      border-green-500 
      hover:bg-green-100 
      hover:text-green-800
      py-2 px-4
    `,
    yellow: `
      border 
      bg-white 
      text-yellow-600 
      border-yellow-500 
      hover:bg-yellow-100 
      hover:text-yellow-800
      py-2 px-4
      border-cyan-500 
      hover:bg-cyan-100 
      hover:text-cyan-800
      py-2 px-4
    `,
    gray: `
      border 
      bg-white 
      text-gray-600 
      border-gray-400 
      hover:bg-gray-100 
      hover:text-gray-700
      py-2 px-4
    `,
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
