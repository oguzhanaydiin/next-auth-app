import { useRef } from "react"
import classes from "./profile-form.module.css"

function ProfileForm(props: any) {
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)

  function submitHandler(event: React.FormEvent) {
    event.preventDefault()
    const enteredNewPassword = newPasswordRef.current!.value
    const enteredOldPassword = oldPasswordRef.current!.value

    if (
      !enteredOldPassword ||
      !enteredNewPassword ||
      enteredOldPassword.trim() === "" ||
      enteredNewPassword.trim() === ""
    ) {
      alert("Please enter a valid password (non-empty values).")
      return
    }

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          required
          ref={oldPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
