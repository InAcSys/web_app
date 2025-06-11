import { SimpleHeader } from "../../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../../layouts/GeneralLayout";

export default function Settings() {
  return (
    <GeneralLayout header={<SimpleHeader title="Configuración" />}>
      <p>Configuración</p>
    </GeneralLayout>
  );
}
