'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BOTTOM_NAV_MENU } from './constants'

export const NavigationBar = () => {
  const [menuId, setMenuId] = useState<number>()

  const handleClickButton = (id: number) => {
    setMenuId(id)
    localStorage.setItem('menuId', id.toString())
  }
  useEffect(() => {
    const savedId = localStorage.getItem('menuId')
    if (savedId) {
      setMenuId(parseInt(savedId))
    }
  }, [])

  return (
    <div className="sticky bottom-0 left-0 w-full h-[4rem] px-[8px] pt-[8px] shadow-2xl bg-white">
      <ul className="flex flex-row ">
        {BOTTOM_NAV_MENU.map((menu) => {
          return (
            <li key={menu.id} className="flex flex-1 justify-center items-center">
              <Link href={menu.path} onClick={() => handleClickButton(menu.id)}>
                <Image
                  alt={menu.name}
                  src={
                    menuId === menu.id
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
  )
}
