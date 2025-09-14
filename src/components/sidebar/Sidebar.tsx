import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoLogoReact } from 'react-icons/io5'
import { SidebarItem } from './SidebarItem';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { LogoutButton } from './LogoutButton'

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/api/auth/signin')
  }

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link 
            href="/dashboard"
            title="home"
            className='flex items-center justify-center'
          >
            {/* Next/Image */}
            <IoLogoReact
              size={50}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image 
            src={session?.user?.image ? session.user.image : 'https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3467.jpg'} 
            alt="prueba" 
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={50}
            height={50}
          />
            <div>
              <h5 
                className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block"
              >
                {session?.user?.name}
              </h5>
              <span className='font-black'>
                {session?.user?.email}
              </span>
              {/* <span className='font-black'>
                { session.user?.roles ? session.user?.roles?.join(',') : 'client'}
              </span> */}
            </div>
            <span className="hidden text-gray-400 lg:block">{ session.user?.roles ? session.user?.roles?.join(',') : 'client'}</span>
        </div>

        
      </div>

      {/*SibebarItem */}
      <SidebarItem/>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton/>
      </div>
    </aside>
  )
}
