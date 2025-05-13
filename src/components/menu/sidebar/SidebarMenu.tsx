import SapiensLogo from "../../../assets/logo.png"

interface Props {
  endpoints: Map<string, Array<string>>
  logo?: string
}

export const SidebarMenu = ({endpoints, logo = SapiensLogo}: Props) => {
  return (
    <div className="side-bar-menu">
      <img src={logo} alt="Institute logo" className="side-bar-menu-logo" width="60px" />
    </div>
  )
}