'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { mockedClients } from "@/mocked-data/client-data";
import { ClientType } from "@/types/client-type";
import { Settings2 } from "lucide-react";
import { BaseSyntheticEvent, useState } from "react";

export default function Home() {
  const [openEditClient, setOpenEditClient] = useState<boolean>(false);
  const [openAddClient, setOpenAddClient] = useState<boolean>(false);

  const [clients, setClients] = useState<ClientType[]>(mockedClients);

  const [filteredClients, setFilteredClients] = useState<ClientType[]>(mockedClients);
  const [filterInput, setFilterInput] = useState<string>("");

  const [addClientNameInput, setAddClientNameInput] = useState<string>("");
  const [editClientNameInput, setEditClientNameInput] = useState<string>("");

  const [selectedClientEditId, setSelectedClientEditId] = useState<number | null>(null);

  const handleEditClientNameInputChange = (e: BaseSyntheticEvent) => {
    setEditClientNameInput(e.target.value);
  }
  
  const handleEditClientButtonClick = (id: number, name: string) => {
    if(id && name) {
      setOpenEditClient(true);
      setEditClientNameInput(name);
      setSelectedClientEditId(id);
    }
    //TODO: add error toast
  }

  const handleFilterClientsInputChange = (e: BaseSyntheticEvent) => {
    const filterWord: string = e.target.value;

    setFilterInput(filterWord);

    setFilteredClients(clients.filter(client => 
      client.name.toLowerCase().includes(filterWord.toLowerCase()))
    );
  }

  const handleEditClientConfirmButtonClick = () => {
    if(editClientNameInput && selectedClientEditId) {
      const clientsCopy: ClientType[] = [...clients];
      const clientsUpdated: ClientType[] = clientsCopy.map(client => client.id === selectedClientEditId ? 
        { ...client, name: editClientNameInput }
        : client
      );

      setClients(clientsUpdated);
      setFilteredClients(clientsUpdated);
      setFilterInput("");
      setEditClientNameInput("");
      setSelectedClientEditId(null);
    }
    //TODO: add error toast
    setOpenEditClient(false);
  }

  const handleEditClientCancelButtonClick = () => {
    setEditClientNameInput("");
    setSelectedClientEditId(null);
    setOpenEditClient(false);
  }

  const handleAddClientButtonClick = () => {
    setOpenAddClient(true);
  }

  const handleAddClientNameInputChange = (e: BaseSyntheticEvent) => {
    setAddClientNameInput(e.target.value);
  }

  const handleAddClientConfirmButtonClick = () => {
    if(addClientNameInput) {
      const id: number = clients.length + 1;

      const clientsCopy: ClientType[] = [...clients, { id: id, name: addClientNameInput }];

      setClients(clientsCopy);
      setFilteredClients(clientsCopy);
      setFilterInput("");
      setAddClientNameInput("");
    }
    //TODO: add error toast
    setOpenAddClient(false);
  }

  const handleAddClientCancelButtonClick = () => {
    setAddClientNameInput("");
    setOpenAddClient(false);
  }

  return (
    <>
      <div className="flex flex-col justify-between h-[calc(100vh-var(--header-height)-var(--spacing)*8)]">
        <div>
          <Label htmlFor="search-client" className="mb-2">Pesquisar</Label>
          <Input 
            id="search-client" 
            placeholder="Nome do cliente" 
            onChange={ handleFilterClientsInputChange }
            value={ filterInput }
          />
        </div>

        <div className="rounded-md border p-4 h-[calc(100%-94px-var(--spacing)*8)]">
          <h2 className="font-medium text-sm mb-2">Clientes</h2>
          <ScrollArea className="w-full h-[calc(100%-20px)]">
            <Table>
              <TableBody>
                {
                  filteredClients.map(client => { 
                    return (
                      <TableRow key={ client.id }>
                        <TableCell className="flex justify-between py-4">
                          <p>{ client.name }</p>
                          <Settings2 onClick={ () => handleEditClientButtonClick(client.id, client.name) } />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <Button onClick={ handleAddClientButtonClick } className="w-full">Adicionar Cliente</Button>
      </div>

      <Dialog open={ openEditClient } onOpenChange={ setOpenEditClient }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Editar nome do cliente</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="new-client-name" className="mb-2">Novo nome</Label>
            <Input 
              id="new-client-name" 
              onChange={ handleEditClientNameInputChange } 
              value={ editClientNameInput }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleEditClientCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleEditClientConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={ openAddClient } onOpenChange={ setOpenAddClient }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Adicionar cliente</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="client-name" className="mb-2">Nome</Label>
            <Input 
              id="client-name" 
              onChange={ handleAddClientNameInputChange }
              value={ addClientNameInput }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleAddClientCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleAddClientConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
