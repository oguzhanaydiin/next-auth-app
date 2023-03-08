import Link from "next/link"
import { signOut } from "next-auth/react"

import classes from "./main-navigation.module.css"
import { isAuthenticated } from "@/lib/auth"

function MainNavigation() {
  function logoutHandler() {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!isAuthenticated() && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {isAuthenticated() && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {isAuthenticated() && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
