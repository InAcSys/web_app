import { useState } from 'react'
import FormLayout from '../layouts/FormLayout'
import '../styles/log-in.css'
import Logo from '../assets/logo.png'
import { Button, CheckBox, Input } from '../components'

export default function LogIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isCheck, setIsCheck] = useState(false)

  return (
    <FormLayout>
      <img src={Logo} alt="Sapiens360 Logo" className="log-in-logo" width="100px" />
      <h1 className='log-in-title'>Iniciar <span>sesion</span></h1>
      <Input label='Correo electrónico' isMandatory value={email} onChange={setEmail} placeholder='example@sapiens360.com' />
      <Input label='Contraseña' isMandatory value={password} onChange={setPassword} placeholder='contraseña' isSecret />
      <CheckBox label='Recuerdame' isMandatory isChecked={isCheck} changeChecked={setIsCheck} />
      <div className="button-log-in-form-section flex-row-center">
        <Button label='Iniciar sesion' />
        <Button label='Olvide mi contraseña' type='action' />
      </div>
    </FormLayout>
  )
}