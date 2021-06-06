import { InspectionDTO, TireStatus } from "@shared/types";
import React from "react";
import { IDataTableColumn } from "react-data-table-component";
import {
  Container,
  FormCheckbox,
  FormInput,
  FormSelect,
  Loading,
  openSwalForm,
  ReactSwal,
  TextInfo,
  withCrudDataTable,
} from "src/components";
import { Row } from "src/components/Row";
import { useAllInspections } from "src/hooks/inspectionHooks";
import { Colors } from "src/layout";
import { Services } from "src/services";
import { bool2YesNo } from "src/utils/bool2YesNo";
import Swal from "sweetalert2";
import * as yup from "yup";

type InspectionSchemaType = Partial<Omit<InspectionDTO, "rent" | "vehicle">>;

const inspectionService = Services.inspections;

const columns: IDataTableColumn<InspectionDTO>[] = [
  {
    name: "ID",
    sortable: true,
    selector: (e) => e.id,
  },

  {
    name: "Rent ID",
    sortable: true,
    selector: (e) => e.rentId,
  },

  {
    name: "Date",
    sortable: true,
    selector: (e) => e.inspectionDate,
  },
];

const initialValues: Partial<InspectionDTO> = {
  haveBrokenGlass: false,
  haveCarJack: false,
  haveScratches: false,
  haveTires: false,
  inspectionDate: new Date(),
  rentId: 0,
  status: "",
  frontLeftTire: TireStatus.Normal,
};

const validationSchema: yup.SchemaOf<InspectionSchemaType> = yup.object({
  id: yup.number(),

  haveBrokenGlass: yup.bool().default(false),

  haveCarJack: yup.bool().default(false),

  haveScratches: yup.bool().default(false),

  haveTires: yup.bool().default(false),

  inspectionDate: yup.date().optional() as any,

  rentId: yup
    .number()
    .min(0, "Rent id is required")
    .required("Rent id is required"),

  status: yup.string().optional(),

  frontLeftTire: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Front left tire status is required"),

  frontRightTire: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Front right tire status is required"),

  backLeftTire: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Back left tire status is required"),

  backRightTire: yup
    .mixed<TireStatus>()
    .oneOf(Object.values(TireStatus))
    .required("Back right tire status is required"),

  vehicleId: yup
    .number()
    .min(1, "Vehicle id is required")
    .required("Vehicle id is required"),
});

export function Inspections() {
  const { isLoading, data = [], refetch } = useAllInspections();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-full lg:max-w-5xl">
      {withCrudDataTable({
        columns,
        data,
        addButtonText: "Add Inspection",
        onAdd: () => openEditor(initialValues).then(() => refetch()),
        onDelete: (row) => openDelete(row).then(() => refetch),
        onDetails: (row) => openDetails(row, refetch),
        onEdit: (row) => openEditor(row).then(() => refetch()),
      })}
    </Container>
  );
}

async function openEditor(initialValues: Partial<InspectionDTO>) {
  return openSwalForm({
    title: "Add Inspection",
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        let result: InspectionDTO;
        if ("id" in values) {
          result = await inspectionService.update(values as InspectionDTO);
        } else {
          result = await inspectionService.create(values);
        }
        console.log(result);
        actions.close();
      } finally {
        actions.setSubmitting(false);
      }
    },
    render: ({ errors, touched }) => (
      <>
        {initialValues.id && (
          <FormInput label="Inspection ID" name="id" readOnly />
        )}
        {initialValues.inspectionDate && (
          <FormInput
            label="Inspection Date"
            name="inspectionDate"
            type="date"
            readOnly
          />
        )}
        <FormCheckbox
          label="Have Scratches"
          name="haveScratches"
          error={errors.haveScratches!}
          touched={touched.haveScratches!}
        />
        <FormCheckbox
          label="Have Broken Glass"
          name="haveBrokenGlass"
          error={errors.haveBrokenGlass!}
          touched={touched.haveBrokenGlass!}
        />
        <FormCheckbox
          label="Have CarJack"
          name="haveCarJack"
          error={errors.haveCarJack!}
          touched={touched.haveCarJack!}
        />
        <FormCheckbox
          label="Have Tires"
          name="haveTires"
          error={errors.haveTires!}
          touched={touched.haveTires!}
        />

        <Row>
          <FormSelect
            label="Front left tire"
            name="frontLeftTire"
            options={TireStatus}
            error={errors.frontLeftTire}
            touched={touched.frontLeftTire}
          />

          <FormSelect
            label="Front right tire"
            name="frontRightTire"
            options={TireStatus}
            error={errors.frontRightTire}
            touched={touched.frontRightTire}
          />

          <FormSelect
            label="Back left tire"
            name="backLeftTire"
            options={TireStatus}
            error={errors.backLeftTire}
            touched={touched.backLeftTire}
          />

          <FormSelect
            label="Back right tire"
            name="backRightTire"
            options={TireStatus}
            error={errors.backRightTire}
            touched={touched.backRightTire}
          />
        </Row>

        <FormInput
          label="Status"
          name="status"
          as="textarea"
          error={errors.status}
          touched={touched.status}
        />
      </>
    ),
  });
}

async function openDelete(entity: InspectionDTO) {
  return ReactSwal.fire({
    icon: "warning",
    title: "Delete Inspection",
    showCancelButton: true,
    confirmButtonColor: Colors.Main,
    focusCancel: true,
    html: <p>Do you want to delete this inspection?</p>,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = await inspectionService.delete(entity.id);
      console.log("DELETED", result);
    }
  });
}

async function openDetails(entity: InspectionDTO, rerender: () => void) {
  return ReactSwal.fire({
    title: "Inspection",
    showCancelButton: true,
    confirmButtonColor: Colors.Main,
    cancelButtonText: "Ok",
    confirmButtonText: "Edit",
    focusCancel: true,
    html: (
      <div className="text-left">
        <TextInfo label="Inspection ID" value={entity.id} />
        <TextInfo label="Rent ID" value={entity.rentId} />
        <TextInfo label="Inspection Date" value={entity.inspectionDate} />
        <TextInfo
          label="Have Broken Glass"
          value={bool2YesNo(entity.haveBrokenGlass)}
        />
        <TextInfo label="Have CarJack" value={bool2YesNo(entity.haveCarJack)} />
        <TextInfo
          label="Have Scratches"
          value={bool2YesNo(entity.haveScratches)}
        />
        <TextInfo label="Have Tires" value={bool2YesNo(entity.haveTires)} />
        <TextInfo label="Tire Status" value={entity.frontLeftTire} />
      </div>
    ),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
      return openEditor(entity).then(rerender);
    }

    return null;
  });
}
