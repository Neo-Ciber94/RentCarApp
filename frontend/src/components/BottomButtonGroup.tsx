import { LinkButton } from ".";
import { MainButton } from "./Buttons";

interface BottomButtonGroupProps {
  cancelPath?: string;
  confirmPath?: string;
  cancelText?: string;
  confirmText?: string;
  noCancelButton?: boolean;
  noConfirmButton?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const BottomButtonGroup: React.FC<BottomButtonGroupProps> = (props) => {
  const {
    cancelPath,
    confirmPath,
    onCancel,
    onConfirm,
    noCancelButton,
    noConfirmButton,
  } = props;

  if (!noCancelButton && cancelPath == null && onCancel == null) {
    throw new Error(
      "'BottomButtonGroup' required 1: 'cancelPath' or 'onCancel'"
    );
  }

  if (!noConfirmButton && confirmPath == null && onConfirm == null) {
    throw new Error(
      "'BottomButtonGroup' required 1: 'confirmPath' or 'onConfirm'"
    );
  }

  return (
    <div className="flex flex-row gap-4 mt-4 w-full">
      {!noCancelButton && <CancelButton {...props} />}
      {!noConfirmButton && <ConfirmButton {...props} />}
    </div>
  );
};

const CancelButton = (props: BottomButtonGroupProps) => {
  if (props.cancelPath) {
    return (
      <LinkButton
        className="w-full text-center"
        color="secondary"
        to={props.cancelPath}
      >
        {props.cancelText || "Cancel"}
      </LinkButton>
    );
  } else {
    return (
      <MainButton
        className="w-full text-center"
        color="secondary"
        onClick={props.onCancel!}
      >
        {props.cancelText || "Cancel"}
      </MainButton>
    );
  }
};

const ConfirmButton = (props: BottomButtonGroupProps) => {
  if (props.confirmPath) {
    return (
      <LinkButton className="w-full text-center" to={props.confirmPath}>
        {props.confirmText || "OK"}
      </LinkButton>
    );
  } else {
    return (
      <MainButton className="w-full text-center" onClick={props.onConfirm!}>
        {props.confirmText || "OK"}
      </MainButton>
    );
  }
};
