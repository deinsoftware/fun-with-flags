"use client"
import Image from 'next/image'
import styles from './LoginButton.module.css'

import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const {data: session } = useSession()
  return (
    <>
      {session ? (
         
        <button className={styles['login-button']} onClick={() => signOut()}>
          <Image
              className={styles['bg-icon']}
              src={session?.user?.image ||"/img/btnLogin.png"}
              width={32}
              height={32}
              alt="Login button"
          />
          <div className={styles['bg-icon']}>
            <span className={styles.text}>Sign Out</span>
          </div>
        </button>
      ) : (
        <button className={styles['login-button']} onClick={() => signIn()}>
            <div className={styles['bg-icon']}>
              <span className={styles.text}>Sign Up</span>
            </div>
        </button>
      )}
      
    </>
  )
}

export default LoginButton
