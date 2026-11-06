import { createTheme, type MantineColorsTuple } from '@mantine/core'

// Verde-água da clínica, do mais claro (0) ao mais escuro (9)
const clinica: MantineColorsTuple = [
  '#e8f6f4', '#d0ebe7', '#a1d6cf', '#6ec0b5', '#44ad9f',
  '#2a9f90', '#169585', '#047d70', '#006e63', '#0b3d38',
]

export const tema = createTheme({
  primaryColor: 'clinica',
  primaryShade: 7,
  colors: { clinica },
  fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif',
  headings: { fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif', fontWeight: '700' },
  black: '#1f2a2e',
  defaultRadius: 'md',
  components: {
    Button: { defaultProps: { radius: 'md', size: 'md' } },
    Badge: { styles: { root: { textTransform: 'none', fontWeight: 700 } } },
    Modal: {
      defaultProps: { radius: 'lg', padding: 'xl', overlayProps: { backgroundOpacity: 0.4, blur: 2 } },
      styles: { title: { fontSize: 22, fontWeight: 700 } },
    },
    TextInput: { defaultProps: { size: 'md' } },
    PasswordInput: { defaultProps: { size: 'md' } },
    NativeSelect: { defaultProps: { size: 'md' } },
  },
})
