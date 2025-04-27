import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { clients } from "@/mocked-data/client-data";
import { Settings2 } from "lucide-react";

export default function Home() {
  return (
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
                        <Settings2 />
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <Button className="w-full">Adicionar Cliente</Button>
    </div>
  );
}
