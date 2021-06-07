import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { ClientDTO, LegalPerson } from "@shared/types";
import { IDataTableColumn } from "react-data-table-component";
import {
  Container,
  Loading,
  TextInfo,
  ReactSwal,
  withCrudDataTable,
  openSwalForm,
  FormInput,
  FormSelect,
} from "src/components";
import { useAllClients } from "src/hooks";
import { Services } from "src/services";
import * as yup from "yup";

const columns: IDataTableColumn<ClientDTO>[] = [
  {
    name: "ID",
    selector: (e) => e.id,
  },

  {
    name: "Name",
    selector: (e) => e.name,
  },

  {
    name: "Email",
    selector: (e) => e.email,
  },

  {
    name: "Document ID",
    selector: (e) => e.documentId,
  },
];

const validationSchema: yup.SchemaOf<Omit<ClientDTO, "id">> = yup.object({
  name: yup.string().required("Name is required"),

  email: yup.string().email("Invalid format").required("Email is required"),

  documentId: yup
    .string()
    .length(
      DOCUMENT_ID_LENGTH,
      `Invalid document id length, expected ${DOCUMENT_ID_LENGTH} digits`
    )
    .required("Document id is required"),

  creditCard: yup
    .string()
    .length(
      CREDIT_CARD_LENGTH,
      `Invalid credit card length, expected ${CREDIT_CARD_LENGTH} digits`
    )
    .required("Credit card is required"),

  creditLimit: yup.number().min(0, "Credit limit must be positive"),

  legalPerson: yup
    .mixed<LegalPerson>()
    .oneOf(Object.values(LegalPerson))
    .required("Legal person is required"),
});

export function Clients() {
  const { isLoading, refetch, data = [] } = useAllClients();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="lg:max-w-6xl">
      {withCrudDataTable({
        columns,
        data,
        sortable: true,
        canDelete: false,
        canAdd: false,
        onDetails: openDetails,
        onEdit: (client) => openEdit(client, refetch),
      })}
    </Container>
  );
}

function openDetails(client: ClientDTO) {
  return ReactSwal.fire({
    title: "Client Details",
    html: (
      <div className="text-left">
        <TextInfo label="ID" value={client.id} />
        <TextInfo label="Name" value={client.name} />
        <TextInfo label="Email" value={client.email} />
        <TextInfo label="Document ID" value={client.documentId} />
        <TextInfo label="Legal Person" value={client.legalPerson} />
        <TextInfo label="Credit Card" value={client.creditCard} />
        <TextInfo label="Credit Limit" value={client.creditLimit} />
      </div>
    ),
  });
}

function openEdit(client: ClientDTO, callback: () => Promise<any>) {
  return openSwalForm({
    title: "Edit Client",
    initialValues: client,
    validationSchema,
    autoFocusCancel: true,
    onSubmit: async (values, actions) => {
      await Services.clients.update(values);
      await callback();
      actions.setSubmitting(false);
      actions.close();
    },
    render: ({ errors, touched }) => (
      <>
        <FormInput label="ID" name="id" value={client.id} readOnly />
        <FormInput
          label="Name"
          name="name"
          error={errors.name}
          touched={touched.name}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          touched={touched.email}
        />
        <FormInput
          label="Document ID"
          name="documentId"
          value={client.documentId}
          error={errors.documentId}
          touched={touched.documentId}
        />
        <FormInput
          label="Credit Card"
          name="creditCard"
          error={errors.creditCard}
          touched={touched.creditCard}
        />
        <FormInput
          label="Credit Limit"
          name="creditLimit"
          error={errors.creditLimit}
          touched={touched.creditLimit}
        />
        <FormSelect
          label="Legal Person"
          name="legalPerson"
          options={LegalPerson}
          error={errors.legalPerson}
          touched={touched.legalPerson}
        />
      </>
    ),
  });
}
