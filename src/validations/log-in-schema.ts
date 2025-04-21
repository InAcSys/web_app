import { z } from "zod";

const logInSchema = z.object({
  email: z
    .string()
    .nonempty("Ingrese un correo electrónico")
    .email("Correo inválido"),
  password: z.string().nonempty("Ingrese una contraseña"),
});

export default logInSchema;
