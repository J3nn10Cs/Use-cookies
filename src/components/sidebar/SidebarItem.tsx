'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiCheckbox, BiCookie } from 'react-icons/bi'
import { CgShoppingCart } from 'react-icons/cg'
import { CiBookmarkCheck } from 'react-icons/ci'
import { LiaStampSolid } from 'react-icons/lia'

export const SidebarItem = () => {
  const pathname = usePathname()
  const navItem = [
    { 
      path : '/dashboard', 
      icon : <CiBookmarkCheck size={40}/>, 
      title : 'Dashboard'
    },
    { 
      path : '/dashboard/rest-todos', 
      icon : <BiCheckbox size={40}/>, 
      title : 'Todos'
    },
    { 
      path : '/dashboard/servers-todos', 
      icon : <LiaStampSolid size={40}/>, 
      title : 'Servers Todos'
    },
    { 
      path : '/dashboard/cookies', 
      icon : <BiCookie size={40}/>, 
      title : 'Cookies'
    },
    { 
      path : '/dashboard/product', 
      icon : <CgShoppingCart size={40}/>, 
      title : 'Productos'
    }
  ]

  return (
    <ul className="space-y-2 tracking-wide mt-8">
      {navItem.map(item => (
        <li
          key={item.path}
        >
          <Link
            className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${pathname === item.path ? 'from-sky-600 to-cyan-400 text-white bg-gradient-to-r' : ''}`}
            href={item.path}
          >
            {item.icon}
            <span className="-mr-1 font-medium">{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
