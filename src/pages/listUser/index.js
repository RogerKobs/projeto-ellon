import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { creditValue, formatName, typeContact } from '../../utils/informationUtil';

export default function ListUser() {

  const [listUser, setListUser] = useState([])

  const [openDialogContacts, setOpenDialogContacts] = useState(false)

  useEffect(() => {
    let listUser = localStorage.getItem("_users")
    setListUser(JSON.parse(listUser))
  }, [])

  setInterval(() => {
    let listUser = localStorage.getItem("_users")
    setListUser(JSON.parse(listUser))
  }, 10000)

  const handleOpenDialogContacts = () => {
    setOpenDialogContacts(!openDialogContacts)
  }

  return (
    <div>
      {listUser?.map(user => (
        <>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Typography>{user.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{user.birthDate}</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>

            <AccordionDetails>
              <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Typography>{user.kindPerson === 'fisica' ? "Pessoa física" : "Pessoa jurídica"}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography>{user.document}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography>R$ {formatName(user.credit, creditValue)}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Button
                    onClick={() => handleOpenDialogContacts()}
                    variant="contained"
                    color="primary"
                  >Exibir contatos</Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Dialog
            open={openDialogContacts}
            onClose={handleOpenDialogContacts}
            maxWidth="sm"
            fullWidth
          >
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Contato</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.contacts.map(contact => (
                    <TableRow key={contact.value}>
                      <TableCell>{formatName(contact.type, typeContact)}</TableCell>
                      <TableCell>{contact.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </>
      ))}
    </div>
  )
}
