import type { ReactNode } from 'react'
import { Box, Center, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconStethoscope } from '@tabler/icons-react'

// Moldura do Login e do Cadastro: faixa da clínica à esquerda, formulário à direita
export function TelaDeEntrada({ children }: { children: ReactNode }) {
  return (
    <Box mih="100vh" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)' }} className="tela-de-entrada">
      <Stack justify="space-between" p={48} bg="clinica.9" c="white" className="faixa-da-clinica">
        <Group gap="sm">
          <ThemeIcon size={40} radius="md" color="clinica.5" variant="filled">
            <IconStethoscope size={24} />
          </ThemeIcon>
          <Text fw={700} fz="lg">Clínica Médica</Text>
        </Group>

        <Box maw={360}>
          <Title order={2} fz={40} lh={1.1} c="white" mb="md">
            A recepção da clínica num lugar só.
          </Title>
          <Text c="clinica.1" fz="lg">
            Marque consultas, encontre pacientes e veja a agenda do dia.
          </Text>
        </Box>

        <Text c="clinica.1" fz="sm">Atendimento de segunda a sexta, manhã e tarde.</Text>
      </Stack>

      <Center p="xl" bg="white">
        {children}
      </Center>
    </Box>
  )
}
