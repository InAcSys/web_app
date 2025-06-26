import { z } from "zod";

const taskSchema = z.object({
  title: z.string().nonempty("Ingrese un título"),
  description: z.string().nonempty("Ingrese una descripción"),
  dueDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "La fecha debe ser hoy o una fecha futura",
    }
  ),
});

export default taskSchema;
