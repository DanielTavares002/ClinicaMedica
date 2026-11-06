import { useState } from 'react'
import { Alert, Anchor, Box, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import axios from 'axios'
import { login } from '../services/api.ts'

export function LoginPage() {
  // O que a pessoa digitou
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  // O que vamos mostrar na tela
  const [erro, setErro] = useState('')
  const [erroCpf, setErroCpf] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar() {
    // Apaga as mensagens da tentativa anterior
    setErro('')
    setErroCpf('')
    setErroSenha('')
    setSucesso('')
    setCarregando(true)

    try {
      const secretario = await login(cpf, senha)
      setSucesso(`Olá, ${secretario.nome}!`)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        // A API respondeu com erro (400 ou 401)
        const dados = e.response.data
        setErro(dados.mensagem)

        // No erro 400, a API manda uma mensagem para cada campo
        if (dados.detalhes) {
          for (const detalhe of dados.detalhes) {
            if (detalhe.campo === 'cpf') setErroCpf(detalhe.mensagem)
            if (detalhe.campo === 'senha') setErroSenha(detalhe.mensagem)
          }
        }
      } else {
        // A API nem respondeu
        setErro('Não foi possível conectar à API. Ela está rodando?')
      }
    }

    setCarregando(false)
  }

  return (
    <Box w="100%" maw={380}>
      <Title order={1} fz={32}>Entrar</Title>
      <Text c="dimmed" mb="xl">Acesse com seu CPF e senha</Text>

      <form
        onSubmit={(evento) => {
          evento.preventDefault()
          entrar()
        }}
      >
        <Stack>
          {sucesso && <Alert color="green">{sucesso}</Alert>}
          {erro && <Alert color="red">{erro}</Alert>}

          <TextInput
            label="CPF"
            placeholder="Somente números"
            value={cpf}
            onChange={(evento) => setCpf(evento.target.value)}
            error={erroCpf}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            error={erroSenha}
          />

          <Button type="submit" loading={carregando}>Entrar</Button>

          <Text size="sm" ta="center">
            Ainda não tem conta? <Anchor href="#">Cadastre-se</Anchor>
          </Text>
        </Stack>
      </form>
    </Box>
  )
}
