import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const medicoSchema = z.object({
    nome: z
        .string({ error: "O nome do médico é obrigatório" })
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres")
        .openapi({ example: "Jhenifer Rodrigues" }),

    crm: z
        .string()
        .regex(
            /^CRM-[A-Z]{2}\s\d{4,6}$/, 
            "O formato deve ser CRM-UF XXXXXX (ex: CRM-SP 123456)"
        )
        .openapi({ example: "CRM-SP 123456", description: "Crm no formato CRM-UF XXXXXX" }),

    especialidade: z
        .string()
        .min(3, "A especialidade deve ter pelo menos 3 caracteres")
        .max(50, "A especialidade deve ter no máximo 100 caracteres")
        .openapi({ example: "Nutricionista" }),
});

export type MedicoInput = z.infer<typeof medicoSchema>;

export const medicoFiltroSchema = z.object({
  nome: z.coerce.string().optional().openapi({ example: "Jhenifer Rodrigues" }),
  crm: z.coerce.string().optional().openapi({ example: "CRM-SP 123456" }),
  especialidade: z.string().optional().openapi({ example: "Nutricionista" }),
});

export type MedicoFiltroInput = z.infer<typeof medicoFiltroSchema>;