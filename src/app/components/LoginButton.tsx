"use client"
import Image from 'next/image'
import styles from './LoginButton.module.css'

import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const {data: session } = useSession()
  return (
    <>
    {session ? (
      <button  className={styles["login-button"]} onClick={() => signOut()}>
        
          <Image
            className={styles.icon}
            src={session?.user?.image ||"/img/btnLogin.png"}
            width={32}
            height={32}
            alt="Login button"
          />
        {/* Sign Out */}
      </button>
      
    ) : (
      <button className={styles["login-button"]} onClick={() => signIn()}>
          Sign In
      </button>
    )}
    </>
  )
}

export default LoginButton
