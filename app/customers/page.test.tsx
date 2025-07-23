import { render, screen, act } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import CustomersPage from "./page";
import { request } from "@/lib/api";
import { 
  customersList, 
  createdCustomer, 
  updatedCustomer,
  successCreateCustomerApiResponse, 
  successListCustomersApiResponse, 
  successUpdateCustomerApiResponse, 
} from "@/mocked-data/api-responses/customer";
import { genericErrorApiResponse, genericErrorMessage } from "@/mocked-data/api-responses/error";
import { mockToastError, mockToastWarning } from "@/vitest.setup";

vi.mock("@/lib/api", () => ({
  request: vi.fn(),
}));

describe("Test customers page", () => {
  describe("When the list customers useEffect resquest is done", () => {
    it("The page should render with received customers list when request succeeds", async () => {
      vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
      await act(async () => { render(<CustomersPage />) });

      expect(screen.getByText("Pesquisar")).toBeInTheDocument();
      expect(screen.getByTestId("customers-search-customer-input")).toBeInTheDocument();

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(customersList.length);
      expect(screen.getByText(customersList[0].name)).toBeInTheDocument();
      expect(screen.getByText(customersList[1].name)).toBeInTheDocument();
      expect(screen.getByText(customersList[2].name)).toBeInTheDocument();

      expect(screen.getByTestId("customers-add-customer-button")).toBeInTheDocument();
    });

    it("The page should render and show an error toast when request fails", async () => {
      vi.mocked(request).mockResolvedValueOnce(genericErrorApiResponse);
      await act(async () => { render(<CustomersPage />) });

      expect(screen.getByText("Pesquisar")).toBeInTheDocument();
      expect(screen.getByTestId("customers-search-customer-input")).toBeInTheDocument();
      expect(screen.getByRole("table"));
      expect(screen.getByTestId("customers-add-customer-button")).toBeInTheDocument();

      expect(mockToastError).toHaveBeenCalledWith(genericErrorMessage);
    });
  });

  describe("When a string is typed in the search customers input", () => {
    it("Customers table should be filtered", async () => {
      const user = userEvent.setup();
      vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
      await act(async () => { render(<CustomersPage />) });

      await user.type(screen.getByTestId("customers-search-customer-input"), "S");

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(2);
      expect(screen.getByText(customersList[0].name)).toBeInTheDocument();
      expect(screen.getByText(customersList[1].name)).toBeInTheDocument();
    });
  });

  describe("When the customer settings icon is clicked", () => {
    it("Edit customer dialog should open with correct customer data", async () => {
      const user = userEvent.setup();
      vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
      await act(async () => { render(<CustomersPage />) });
  
      expect(screen.getByTestId("customers-settings-icon-1")).toBeInTheDocument();
      await user.click(screen.getByTestId("customers-settings-icon-1"));

      expect(screen.getByText("Editar nome do cliente")).toBeInTheDocument();
      expect(screen.getByText("Novo nome")).toBeInTheDocument();
      expect(screen.getByTestId("customers-edit-customer-name-input")).toBeInTheDocument();
      expect(screen.getByTestId("customers-edit-customer-name-input")).toHaveValue(customersList[0].name);
      expect(screen.getByTestId("customers-edit-customer-cancel-button")).toBeInTheDocument();
      expect(screen.getByTestId("customers-edit-customer-confirm-button")).toBeInTheDocument();
    });

    describe("When the edit customer cancel button is clicked", () => {
      it("Edit customer dialog should close", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });

        await user.click(screen.getByTestId("customers-settings-icon-1"));
        await user.click(screen.getByTestId("customers-edit-customer-cancel-button"));

        expect(screen.queryByText("Editar nome do cliente")).not.toBeInTheDocument();
        expect(screen.queryByText("Novo nome")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-edit-customer-name-input")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-edit-customer-cancel-button")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-edit-customer-confirm-button")).not.toBeInTheDocument();
      });
    });

    describe("When the edit customer confirm button is clicked", () => {
      it("Should show toast warning when edited customer data is invalid", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
  
        await user.click(screen.getByTestId("customers-settings-icon-1"));
        await user.clear(screen.getByTestId("customers-edit-customer-name-input"));
        await user.click(screen.getByTestId("customers-edit-customer-confirm-button"));
  
        expect(mockToastWarning).toHaveBeenCalledWith("Dados inválidos.");
      });

      it("Should show toast error when resquest fails", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
  
        vi.mocked(request).mockResolvedValueOnce(genericErrorApiResponse);
        await user.click(screen.getByTestId("customers-settings-icon-1"));
        await user.clear(screen.getByTestId("customers-edit-customer-name-input"));
        await user.type(screen.getByTestId("customers-edit-customer-name-input"), updatedCustomer.name);
        await user.click(screen.getByTestId("customers-edit-customer-confirm-button"));
  
        expect(mockToastError).toHaveBeenCalledWith(genericErrorMessage);
      });

      it("Edited customer name should be updated in the customers table", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });

        vi.mocked(request).mockResolvedValueOnce(successUpdateCustomerApiResponse);
        await user.click(screen.getByTestId("customers-settings-icon-1"));
        await user.clear(screen.getByTestId("customers-edit-customer-name-input"));
        await user.type(screen.getByTestId("customers-edit-customer-name-input"), updatedCustomer.name);
        await user.click(screen.getByTestId("customers-edit-customer-confirm-button"));

        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(customersList.length);
        expect(screen.getByText(updatedCustomer.name)).toBeInTheDocument();
      });

    });

  });

  describe("When add customer button is clicked", () => {
    it("Add customer dialog should open", async () => {
      const user = userEvent.setup();
      vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
      await act(async () => { render(<CustomersPage />) });
  
      expect(screen.getByTestId("customers-add-customer-button")).toBeInTheDocument();
      await user.click(screen.getByTestId("customers-add-customer-button"));
      
      expect(screen.getByText("Adicionar cliente")).toBeInTheDocument();
      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByTestId("customers-add-customer-name-input")).toBeInTheDocument();
      expect(screen.getByTestId("customers-add-customer-cancel-button")).toBeInTheDocument();
      expect(screen.getByTestId("customers-add-customer-confirm-button")).toBeInTheDocument();
    });

    describe("When the add customer confirm button is clicked", () => {
      it("Add customer dialog should close", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
    
        await user.click(screen.getByTestId("customers-add-customer-button"));
        await user.click(screen.getByTestId("customers-add-customer-cancel-button"));
        
        expect(screen.queryByText("Adicionar cliente")).not.toBeInTheDocument();
        expect(screen.queryByText("Nome")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-add-customer-name-input")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-add-customer-cancel-button")).not.toBeInTheDocument();
        expect(screen.queryByTestId("customers-add-customer-confirm-button")).not.toBeInTheDocument();
      });
    });

    describe("When the add customer confirm button is clicked", () => {
      it("Should show toast warning when new customer data is invalid", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
  
        await user.click(screen.getByTestId("customers-add-customer-button"));
        await user.click(screen.getByTestId("customers-add-customer-confirm-button"));
  
        expect(mockToastWarning).toHaveBeenCalledWith("Dados inválidos.");
      });
  
      it("Should show toast error when resquest fails", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
  
        vi.mocked(request).mockResolvedValueOnce(genericErrorApiResponse);
        await user.click(screen.getByTestId("customers-add-customer-button"));
        await user.type(screen.getByTestId("customers-add-customer-name-input"), createdCustomer.name);
        await user.click(screen.getByTestId("customers-add-customer-confirm-button"));
  
        expect(mockToastError).toHaveBeenCalledWith(genericErrorMessage);
      });
  
      it("New customer should appear in the customer table when request succeeds", async () => {
        const user = userEvent.setup();
        vi.mocked(request).mockResolvedValueOnce(successListCustomersApiResponse);
        await act(async () => { render(<CustomersPage />) });
  
        vi.mocked(request).mockResolvedValueOnce(successCreateCustomerApiResponse);
        await user.click(screen.getByTestId("customers-add-customer-button"));
        await user.type(screen.getByTestId("customers-add-customer-name-input"), createdCustomer.name);
        await user.click(screen.getByTestId("customers-add-customer-confirm-button"));
  
        const rows = screen.getAllByRole("row");
        expect(rows).toHaveLength(4);
        expect(screen.getByText(createdCustomer.name)).toBeInTheDocument();
      });
    });
  });
});