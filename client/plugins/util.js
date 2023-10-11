export default function ({ app }, inject) {
  inject('buildError', (string) => {
    return buildError(string)
  })

  inject('sleep', (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  })

  inject('formatPeriodo', (checkIn, checkOut) => {
    return formatPeriodo(checkIn, checkOut)
  })

  inject('apenasNumeros', (valor) => {
    return apenasNumeros(valor)
  })

  inject('DataSemHora', (date) => {
    return DataSemHora(date)
  })

  inject('DataHora', (date) => {
    return DataHora(date)
  })

  inject('AnoMes', (date) => {
    return AnoMes(date)
  })

  inject('formatarTelefone', (numero) => {
    return formatarTelefone(numero)
  })

  inject('formatMoeda', (amount, decimalCount, decimal, thousands) => {
    return formatMoeda(amount, decimalCount, decimal, thousands)
  })

  inject('formatarPrecoString', (v) => {
    return formatarPrecoString(v)
  })

  inject('formatarCpfCnpj', (valor) => {
    return formatarCpfCnpj(valor)
  })

  inject('validarDiaMesAno', (data) => {
    return /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/.test(data)
  })

  inject('validarEmail', (valor) => {
    const re = /\S+@\S+\.\S+/
    return re.test(valor)
  })

  inject('validarTelefoneCelular', (valor) => {
    return validarTelefoneCelular(valor)
  })

  inject('validarCpfCnpj', (valor) => {
    const cpfCnpj = apenasNumeros(valor)
    if (cpfCnpj.length === 11) {
      return validarCpf(cpfCnpj)
    } else if (cpfCnpj.length === 14) {
      return validarCnpj(cpfCnpj)
    } else {
      return false
    }
  })

  inject('valorVazioOuFalso', (valor) => {
    return valorVazioOuFalso(valor)
  })

  inject('getIndex', (item, id, lista) => {
    return getIndex(item, id, lista)
  })

  inject('getSelecionado', (id, array, index) => {
    return getSelecionado(id, array, index)
  })

  inject('preSelecionar', (array, index, id, updateFunction) => {
    return preSelecionar(array, index, id, updateFunction)
  })

  inject('validarFormulario', (form, vmodel, promise, bolErros) => {
    return validarFormulario(form, vmodel, promise, bolErros)
  })

  inject('getDataMask', () => {
    return getDataMask()
  })

  inject('getCpfCnpjMask', () => {
    return getCpfCnpjMask()
  })

  inject('getTelefoneMask', () => {
    return getTelefoneMask()
  })

  inject('getDataMask', () => {
    return getDataMask()
  })

  // Retorna uma promisse para que possa terminar um loading depois que a tela de download aparecer
  // Como usar:
  // this.loading = true
  // this.$download(rota, params, nome).finaly(this.loading = false)
  inject('download', function (rotaStore, params, nomeArquivo) {
    return new Promise((resolve, reject) => {
      resolve(
        this.$store.dispatch(rotaStore, params)
          .then((response) => {
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(new Blob([response.data]))
            link.setAttribute('download', nomeArquivo)
            document.body.appendChild(link)
            link.click()
            link.remove()
          })
          .catch(({ response }) => {
            const reader = new FileReader()
            reader.readAsText(response.data)
            reader.onload = () => {
              const retorno = JSON.parse(reader.result)
              this.$nuxt.$emit('snackbar', retorno.mensagem, 'error')
            }
          })
      )
    })
  })
}

// Validações

function validarTelefoneCelular (telefone) {
  if (typeof telefone === 'number') {
    telefone = String(telefone)
  }
  if (typeof telefone !== 'string') {
    return false
  }

  telefone = apenasNumeros(telefone)

  const apenasNumerosRepetidos = new Set(telefone).size === 1
  if (apenasNumerosRepetidos) {
    return false
  }
  if (telefone.length < 10 || telefone.length > 11) {
    return false
  }
  if (telefone.length === 11 && telefone[2] !== '9') {
    return false
  }
  return true
}

export function valorVazioOuFalso (value) {
  if (value === null || value === false || value === '' || value === undefined) {
    return true
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

export function validarCpf ($cpf) {
  let numeros, digitos, soma, i, resultado, digitosIguais
  digitosIguais = 1

  for (i = 0; i < $cpf.length - 1; i++) {
    if ($cpf.charAt(i) !== $cpf.charAt(i + 1)) {
      digitosIguais = 0
      break
    }
  }

  if (!digitosIguais) {
    numeros = $cpf.substring(0, 9)
    digitos = $cpf.substring(9)
    soma = 0
    for (i = 10; i > 1; i--) {
      soma += numeros.charAt(10 - i) * i
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado.toString() !== digitos.charAt(0)) {
      return false
    }
    numeros = $cpf.substring(0, 10)
    soma = 0
    for (i = 11; i > 1; i--) {
      soma += numeros.charAt(11 - i) * i
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado.toString() !== digitos.charAt(1)) {
      return false
    }
    return true
  } else {
    return false
  }
}

export function validarCnpj ($cnpj) {
  let numeros, digitos, soma, i, resultado, pos, tamanho, digitosIguais
  digitosIguais = 1
  for (i = 0; i < $cnpj.length - 1; i++) {
    if ($cnpj.charAt(i) !== $cnpj.charAt(i + 1)) {
      digitosIguais = 0
      break
    }
  }

  if (!digitosIguais) {
    tamanho = $cnpj.length - 2
    numeros = $cnpj.substring(0, tamanho)
    digitos = $cnpj.substring(tamanho)
    soma = 0
    pos = tamanho - 7
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado.toString() !== digitos.charAt(0)) {
      return false
    }

    tamanho = tamanho + 1
    numeros = $cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado.toString() !== digitos.charAt(1)) {
      return false
    }
    return true
  } else {
    return false
  }
}

// Parsing

export function apenasNumeros (valor) {
  return valor !== null && valor !== '' && typeof valor === 'string' ? valor.trim().replace(/[^0-9]/g, '') : ''
}

export function DataSemHora (date) {
  if (!date) {
    return null
  }
  date = new Date(date).toLocaleDateString('pt-BR')
  return date
}

export function DataHora (date) {
  date = new Date(date).toLocaleDateString('pt-BR') + ' ' + new Date(date).toLocaleTimeString('pt-BR')
  return date
}

export function AnoMes (date) {
  const data = new Date(date)
  const ano = data.getFullYear()
  const mes = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
  return ano + '/' + mes
}

export function apenasHorario (date) {
  date = new Date(date).toLocaleTimeString('pt-BR')
  return date
}

// Formatação

export function formatPeriodo (checkIn, checkOut) {
  const checkInDate = new Date(checkIn + 'T12:00:00')
  const checkOutDate = new Date(checkOut + 'T12:00:00')

  let periodo = ''

  if (checkInDate.getMonth() === checkOutDate.getMonth()) {
    // Mesmo mês
    periodo = `${checkInDate.getDate()}-${checkOutDate.getDate()} ${checkInDate.toLocaleString('pt-BR', { month: 'short' })}`
  } else {
    // Meses diferentes
    periodo = `${checkInDate.getDate()}-${checkOutDate.getDate()} ${checkOutDate.toLocaleString('pt-BR', { month: 'short' })}`
  }

  return periodo
}

export function formatarCpfCnpj (valor) {
  const cnpjCpf = apenasNumeros(valor)
  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  } else if (cnpjCpf.length === 14) {
    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
  } else {
    return cnpjCpf
  }
}

export function formatarTelefone (numero) {
  apenasNumeros(numero)
  const stripped = numero.replace(/[^\d]/g, '')
  const match = stripped.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return numero
}

export function formatMoeda (amount, decimalCount = 2, decimal = ',', thousands = '.') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    // Adicionado: verifique se o valor após a casa decimal é 0.
    const fractional = Math.abs(amount - i).toFixed(decimalCount).slice(2)
    const showFractional = fractional !== '00'

    return negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (showFractional ? decimal + fractional : '')
  } catch (e) {
    // console.log(e)
  }
}

export function formatarPrecoString (v) {
  if (v !== null && v !== '') {
    v = v.replace(/\D/g, '')
    v = String(Number(v))
    const len = v.length
    if (len === 1) { v = v.replace(/(\d)/, '0,0$1') } else if (len === 2) { v = v.replace(/(\d)/, '0,$1') } else if (len > 2) {
      v = v.replace(/(\d{2})$/, ',$1')
      v = v.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    }
  }
  return v
}

// Inputs

export function getIndex (lista, id, item) {
  return lista.findIndex(o => parseInt(o[id]) === parseInt(item[id]))
}

export function atualizarItemArray (lista, id, item, novoItem) {
  const i = getIndex(lista, id, item)
  // Caso inexistente
  if (i < 0) {
    return
  }
  // Caso removido
  if (!novoItem) {
    return [...lista.slice(0, i), ...lista.slice(i + 1)]
  }
  // Caso atualizado
  return [...lista.slice(0, i), novoItem, ...lista.slice(i + 1)]
}

export function getSelecionado (id, array, index = 'value') {
  if (!id) {
    return {}
  }
  const itemsArray = array
  const itemSelecionado = itemsArray.find(item => item[index] === id)
  return itemSelecionado
}

export async function preSelecionar (array, index, id, updateFunction) {
  if (array && array.length === 1) {
    await updateFunction(array[0][index], array, index)
  } else if (id) {
    await updateFunction(id, array, index)
  }
}

export async function validarFormulario (form, vmodel, promise = false, bolMostrarErros = false) {
  bolMostrarErros = true
  const formValido = await form.validate()
  if (vmodel && formValido) {
    return true
  }
  if (!promise) {
    return false
  }

  const error = {
    data: {
      log: 'Formulário inválido: Erro na validação dos inputs',
      mensagem: undefined
    }
  }
  throw error
}

export function buildError (string) {
  const error = new Error('Erro construído pelo Front-end')
  error.response = { data: { mensagem: string } }
  return error
}

// Masks

export function getTelefoneMask () {
  return ['(##) ####-####', '(##) #####-####']
}

export function getCpfCnpjMask () {
  return ['###.###.###-##', '##.###.###/####-##']
}

export function getDataMask () {
  return '##/##/####'
}
