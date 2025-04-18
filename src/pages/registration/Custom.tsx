import { useEffect } from "react";
import FormLayout from "../../layouts/FormLayout";
import { NAME_PAGE } from "../../utils/constants";

export default function Custom() {

  useEffect(() => {
    document.title = `Personalización - ${NAME_PAGE}`
  })

  return (
    <FormLayout>
      <h1>Personaliza tu experiencia en <span>Sapiens360</span></h1>
    </FormLayout>
  )
}