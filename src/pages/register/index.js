import React, { useState, useEffect } from 'react'
import {
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  MenuItem,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { cpfMask, cnpjMask } from '../../utils/maskUtil'
import { creditValue, formatName, typeContact } from '../../utils/informationUtil'

export default function Register() {

  const newUser = {
    name: "",
    kindPerson: "fisica",
    document: "",
    birthDate: new Date(),
    credit: 1000,
    contacts: []
  }

  const newContact = {
    type: "personalPhone",
    value: ""
  }

  const [user, setUser] = useState(newUser)
  const [contact, setContact] = useState(newContact)

  const [listUser, setListUser] = useState([])
  const [listContact, setListContact] = useState([])

  const [error, setError] = useState({
    name: null,
    document: null,
    contact: null
  })

  useEffect(() => {
    let listUser = localStorage.getItem("_users")
    setListUser(JSON.parse(listUser))
  }, [])

  const handleChangeUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleChangeContact = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
  }

  const handleChangeDate = (birthDate) => {
    setUser({ ...user, birthDate })
  }

  const save = () => {
    let copyListUser = Object.assign([], listUser)
    let copyUser = Object.assign({}, user)
    console.log("salvo")
    //Formata a data antes de salvar
    let dateFormated = new Intl.DateTimeFormat('pt-br').format(user.birthDate)
    copyUser.birthDate = dateFormated

    copyListUser.push(copyUser)

    localStorage.setItem("_users", JSON.stringify(copyListUser))

    setUser(newUser)
    setContact(newContact)
    setListContact([])
    setListUser(copyListUser)
  }

  const addContact = () => {
    let copyListContact = Object.assign([], listContact)
    copyListContact.push(contact)

    setUser({ ...user, contacts: copyListContact })
    setContact(newContact)
    setListContact(copyListContact)
  }

  const validate = () => {
    let error = false;
    let erros = { name: null, document: null, contact: null };

    if (!user.name) {
      erros.name = "Por favor, insira seu nome"
      error = true;
    }

    if(!user.document) {
      erros.document = "Por favor, insira seu documento"
      error = true;
    }

    if(!user.document) {
      erros.document = "Por favor, insira seu documento"
      error = true;
    }

    if (user.contacts.length === 0) {
      erros.contact = "Por favor, insira ao menos um contato"
      error = true;
    }

    setError(erros)

    if (error) {
      return
    }

    save()
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Nome"
            variant="outlined"
            required
            fullWidth
            error={error.name !== null}
            helperText={error.name}
            value={user.name}
            onChange={event => handleChangeUser(event)}
          />
        </Grid>

        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Data de nascimento"
              format="dd/MM/yyyy"
              margin="normal"
              fullWidth
              value={user.birthDate}
              onChange={birthDate => handleChangeDate(birthDate)}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Tipo da pessoa</FormLabel>
            <RadioGroup
              row
              name="kindPerson"
              value={user.kindPerson}
              onChange={event => handleChangeUser(event)}
            >
              <FormControlLabel value="fisica" control={<Radio />} label="Pessoa física" />
              <FormControlLabel value="juridica" control={<Radio />} label="Pessoa jurídica" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="document"
            label="Número do documento"
            variant="outlined"
            required
            fullWidth
            error={error.document !== null}
            helperText={error.document}
            defaultValue={user.document}
            onChange={event => handleChangeUser(event)}
            InputProps={{
              inputComponent: user.kindPerson === 'fisica' ? cpfMask : cnpjMask,
              value: user.document
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="credit"
            label="Limite de crédito"
            variant="outlined"
            value={user.credit}
            onChange={event => handleChangeUser(event)}
            fullWidth
            select
          >
            {creditValue.map(credit => (
              <MenuItem key={credit.value} value={credit.value}>
                R$ {credit.descriprion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            name="type"
            label="Tipo de contato"
            variant="outlined"
            value={contact.type}
            onChange={event => handleChangeContact(event)}
            fullWidth
            select
          >
            {typeContact.map(contact => (
              <MenuItem key={contact.value} value={contact.value}>
                {contact.descriprion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            name="value"
            label="Contato"
            variant="outlined"
            required
            fullWidth
            error={error.contact !== null}
            helperText={error.contact}
            value={contact.value}
            onChange={event => handleChangeContact(event)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => addContact()}
            fullWidth
          >Adicionar novo contato</Button>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Contato</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listContact.map(contact => (
                <TableRow key={contact.value}>
                  <TableCell>{formatName(contact.type, typeContact)}</TableCell>
                  <TableCell>{contact.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => validate()}
            color="primary"
            fullWidth
          >Cadastrar cliente</Button>
        </Grid>
      </Grid>
    </div>
  )
}
