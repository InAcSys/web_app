import "./welcome-header.css"

interface Props {
  shortname: string
  role: string
}

export const WelcomeHeader = ({shortname, role}: Props) => {
  return (
    <div className="welcome-header-container">
      <h1 className="welcome-header-shortname-text complete-left">¡Hola <span>{shortname}</span>!</h1>
      <p className="welcome-header-role-text complete-left">Rol: <span>{role}</span></p>
    </div>
  )
}