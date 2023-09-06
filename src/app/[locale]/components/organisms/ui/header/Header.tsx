'use client'

import HeaderDesktop from './header-desktop/HeaderDesktop'

import HeaderMobile from './header-mobile/HeaderMobile'

import { useIsMobile } from '@/hooks/useIsMobile'

const Header = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <HeaderMobile />
  }

  return <HeaderDesktop />
}

export default Header
