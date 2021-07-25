export const creditValue = [
  { value: 1000, descriprion: "1.000,00" },
  { value: 5000, descriprion: "5.000,00" },
  { value: 10000, descriprion: "10.000,00" },
  { value: 50000, descriprion: "50.000,00" },
  { value: 100000, descriprion: "100.000,00" },
]

export const typeContact = [
  { value: "email", descriprion: "E-mail" },
  { value: "personalPhone", descriprion: "Telefone celular" },
  { value: "homePhone", descriprion: "Telefone residêncial" },
  { value: "commercialPhone", descriprion: "Telefone comercial" },
  { value: "socialNetwork", descriprion: "Redes sociais" }
]

export function formatName(value, type) {
  let typeSelect = type.find(contact => contact.value === value)
  return typeSelect.descriprion
}