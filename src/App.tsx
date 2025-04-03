import Button from "./components/buttons/Button"
import Input from "./components/inputs/Input"
import { useState } from "react"

function App() {

  const [value, setValue] = useState("")

  return (
    <>
    <h1>Components</h1>
    <Button type="secondary" disabled={false} />
    <Input value={value} onChange={setValue} isMandatory={true} isSecret={false} error="" />
    </>
  )
}

export default App
