import Loader from "react-loader-spinner";
import { Container } from ".";

export function Loading() {
  return (
    <Container className="h-full">
      <div className="flex flex-row h-full items-center justify-center">
        <Loader type="Oval" color="red" />
      </div>
    </Container>
  );
}
