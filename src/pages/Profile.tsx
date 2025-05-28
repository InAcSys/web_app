import { SimpleHeader } from "../components/pages/headers/simple-header/SimpleHeader";
import GeneralLayout from "../layouts/GeneralLayout";

export default function Profile() {
  return (
    <GeneralLayout header={<SimpleHeader title="Perfil" />}>
      <p>Perfil</p>
    </GeneralLayout>
  );
}
