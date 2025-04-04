import { SubDomain } from "./components";
import Button from "./components/buttons/Button";
import Dropdown from "./components/dropdown/Dropdown";
import Input from "./components/inputs/Input";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [domain, setDomain] = useState("")
  const [option, setOption] = useState(-1);
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Components</h1>
      <Button type="secondary" disabled={false} />
      <Input
        value={value}
        onChange={setValue}
        isMandatory={true}
        isSecret={true}
        error=""
      />
      <Dropdown
        optionSelected={option}
        changeOptionSelected={setOption}
        isOpen={open}
        isDisabled={false}
        options={["Uno", "Dos", "Tres", "cuatro", "cinco", "seis"]}
        setIsOpen={setOpen}
      />
      <SubDomain value={domain} changeValue={setDomain} />
    </>
  );
}

export default App;
