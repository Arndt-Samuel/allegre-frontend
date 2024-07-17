import axios from 'axios'

interface AddressResponse {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export const getAddressByZip = async (
  zip: string
): Promise<AddressResponse> => {
  const response = await axios.get(`https://viacep.com.br/ws/${zip}/json/`)
  if (response.data.erro) {
    throw new Error('Invalid ZIP code')
  }
  return response.data
}
