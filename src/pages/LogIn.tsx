import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import FormLayout from '../layouts/FormLayout'
import '../styles/log-in.css'
import Logo from '../assets/logo.png'
import { Button, CheckBox, Input } from '../components'
import { NAME_PAGE } from '../utils/constants'

export default function LogIn() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isCheck, setIsCheck] = useState(false)

  const logIn = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    document.title = `Inicio de sesión - ${NAME_PAGE}`
  })

  return (
    <FormLayout>
      <img src={Logo} alt="Sapiens360 Logo" className="log-in-logo" width="100px" />
      <h1 className='log-in-title'>Iniciar <span>sesion</span></h1>
      <Input label='Correo electrónico' isMandatory value={email} onChange={setEmail} placeholder='example@sapiens360.com' />
      <Input label='Contraseña' isMandatory value={password} onChange={setPassword} placeholder='contraseña' isSecret />
      <CheckBox label='Recuerdame' isMandatory isChecked={isCheck} changeChecked={setIsCheck} />
      <div className="button-log-in-form-section flex-row-center">
        <Button label='Iniciar sesion' onClick={logIn} />
        <Button label='Olvide mi contraseña' type='action' />
      </div>
    </FormLayout>
  )
}