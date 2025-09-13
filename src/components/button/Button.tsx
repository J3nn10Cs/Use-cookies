import React, { JSX } from 'react'

interface Props {
  icon : JSX.Element
}

export const Button = ( { icon } : Props ) => {
  return (
    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
      {icon}
    </button>
  )
}
