import { SubDomain, Dropdown, Input, Button, CheckBox } from "./components";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [domain, setDomain] = useState("");
  const [option, setOption] = useState(-1);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <h1>Components</h1>
      <Button type="secondary" disabled={false} />
      <Input
        value={value}
        onChange={setValue}
        isMandatory={true}
        isSecret={false}
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
      <SubDomain value={domain} changeValue={setDomain} error="" />
      <CheckBox isChecked={checked} changeChecked={setChecked} isMandatory />
    </>
  );
}

export default App;
