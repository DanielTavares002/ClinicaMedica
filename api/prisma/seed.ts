import { prisma } from "../src/config/prisma.js";

// Médicos que já vêm no banco: a clínica não tem tela de cadastro de médico.
// upsert pelo CRM: rodar o seed de novo não duplica ninguém.
const medicos = [
  { nome: "Dr. Carlos Eduardo", crm: "CRM-SP-123456", especialidade: "Cardiologia" },
  { nome: "Dra. Fernanda Lima", crm: "CRM-PB-10234", especialidade: "Clínica Geral" },
  { nome: "Dr. Rafael Moura", crm: "CRM-PB-11872", especialidade: "Dermatologia" },
  { nome: "Dra. Juliana Rocha", crm: "CRM-PB-12550", especialidade: "Pediatria" },
  { nome: "Dr. Marcelo Tavares", crm: "CRM-PB-13019", especialidade: "Ortopedia" },
  { nome: "Dra. Patrícia Nunes", crm: "CRM-PB-14406", especialidade: "Ginecologia" },
];

for (const medico of medicos) {
  await prisma.medico.upsert({
    where: { crm: medico.crm },
    update: { nome: medico.nome, especialidade: medico.especialidade },
    create: medico,
  });
}

console.log(`${medicos.length} médicos no banco.`);
await prisma.$disconnect();
