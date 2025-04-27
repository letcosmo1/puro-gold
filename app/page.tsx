'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { clients } from "@/mocked-data/client-data";
import { Settings2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [openEditClient, setOpenEditClient] = useState(false);
  const [openAddClient, setOpenAddClient] = useState(false);

  const handleEditClientButtonClick = () => {
    setOpenEditClient(true);
  }

  const handleAddClientButtonClick = () => {
    setOpenAddClient(true);
  }

  return (
    <>
      <div className="flex flex-col justify-between h-[calc(100vh-var(--header-height)-var(--spacing)*8)]">
        <div>
          <Label htmlFor="search-client" className="mb-2">Pesquisar</Label>
          <Input id="search-client" placeholder="Nome do cliente" />
        </div>

        <div className="rounded-md border p-4 h-[calc(100%-94px-var(--spacing)*8)]">
          <h2 className="font-medium text-sm mb-2">Clientes</h2>
          <ScrollArea className="w-full h-[calc(100%-20px)]">
            <Table>
              <TableBody>
                {
                  clients.map(client => { 
                    return (
                      <TableRow key={ client.id }>
                        <TableCell className="flex justify-between py-4">
                          <p>{ client.name }</p>
                          <Settings2 onClick={ handleEditClientButtonClick } />
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
            <Input id="new-client-name" />
          </div>
          <DialogFooter className="flex-row">
            <Button className="w-1/2" onClick={ () => setOpenEditClient(false) }>Cancelar</Button>
            <Button className="w-1/2" onClick={ () => setOpenEditClient(false) }>Confirmar</Button>
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
            <Input id="client-name" />
          </div>
          <DialogFooter className="flex-row">
            <Button className="w-1/2" onClick={ () => setOpenAddClient(false) }>Cancelar</Button>
            <Button className="w-1/2" onClick={ () => setOpenAddClient(false) }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
