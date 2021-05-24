import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Container } from "src/components";
import { AuthContext } from "src/context/AuthContext";

export const EditProfile = observer(() => {
  const authService = useContext(AuthContext);
  console.log(authService);

  return (
    <Container>
      <h1>Edit Profile</h1>
    </Container>
  );
});
