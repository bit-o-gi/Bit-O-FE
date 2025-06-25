'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BOTTOM_NAV_MENU } from './constants'
import { usePathname } from 'next/navigation'

export const NavigationBar = () => {
  const curPathname = usePathname()

  return (
    <div className="fixed bottom-0 left-1/2 right-1/2 -translate-x-1/2 translate-y-0 w-full min-w-[280px] max-w-[33.75rem] h-[4rem]">
      <div className="w-full h-full px-[8px] pt-[8px] shadow-2xl bg-white">
        <ul className="flex flex-row ">
          {BOTTOM_NAV_MENU.map((menu) => {
            return (
              <li key={menu.id} className="flex flex-1 justify-center items-center">
                <Link href={menu.path} replace>
                  <Image
                    alt={menu.name}
                    src={
                      curPathname === menu.path
                        ? `/images/icon/${menu.image}.png`
                        : `/images/icon/${menu.image}_unactive.png`
                    }
                    width={24}
                    height={24}
                    priority
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
