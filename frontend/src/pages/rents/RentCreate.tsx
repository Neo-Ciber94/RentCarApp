import { CREDIT_CARD_LENGTH, DOCUMENT_ID_LENGTH } from "@shared/config";
import { LegalPerson, TireStatus } from "@shared/types";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { RandomString } from "src/utils/RandomString";
import { RentForm } from "./RentForm";

export const RentCreate = observer(() => {
  const authService = useContext(AuthContext);
  const currentUser = authService.currentUser!;

  return (
    <RentForm
      initialValues={{
        // Rent
        vehicleId: 0,
        employeeId: currentUser.id,
        comments: "",

        // Client
        name: "",
        email: "",
        creditLimit: 0,
        creditCard: RandomString.number(CREDIT_CARD_LENGTH),
        documentId: RandomString.number(DOCUMENT_ID_LENGTH),
        legalPerson: LegalPerson.Physical,

        // Inspection
        haveScratches: false,
        haveBrokenGlass: false,
        haveCarJack: false,
        haveTires: false,
        frontLeftTire: TireStatus.Normal,
        frontRightTire: TireStatus.Normal,
        backLeftTire: TireStatus.Normal,
        backRightTire: TireStatus.Normal,
        status: "",
      }}
    />
  );
});
