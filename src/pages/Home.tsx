import sapiensLogo from '../assets/sapiens-logo.png'
import { Button } from '../components'

export default function Home() {
  return (
    <div className="home-cover-section">
      <img src={sapiensLogo} alt='Sapiens 360 Logo' />
      <p>Simplificando la gestión académica con inteligencia y precisión.</p>
      <div className="home-cover-buttons-section">
        <Button label='Registrar institución ->' />
        <Button type='secondary' label='Acceder a mi institución' />
      </div>
    </div>
  )
}