import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const pacienteSchema = z.object({
    nome: z
        .string({ error: "O nome do paciente é obrigatório" })
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres")
        .openapi({ example: "Daniel Tavares" }),

    cpf: z
        .string()
        .regex(
            /^\d{11}$/,
            "O CPF deve conter exatamente 11 números (apenas dígitos)"
        )
        .openapi({ example: "12345678901" }),

    telefone: z
        .string({ error: "O telefone é obrigatório" })
        .min(10, "O telefone deve ter pelo menos 10 dígitos")
        .max(15, "O telefone deve ter no máximo 15 dígitos")
        .openapi({ example: "83999998888" }),
});

export type PacienteInput = z.infer<typeof pacienteSchema>;

export const pacienteFiltroSchema = z.object({
  nome: z.coerce.string().optional().openapi({ example: "Jhenifer Rodrigues" }),
  cpf: z.coerce.string().optional().openapi({ example: "12345678901" }),
  telefone: z.string().optional().openapi({ example: "83999998888" }),
});

export type PacienteFiltroInput = z.infer<typeof pacienteFiltroSchema>;