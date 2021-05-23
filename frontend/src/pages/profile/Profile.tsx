import { Container } from "src/components";
import { observer } from "mobx-react-lite";
import { AuthContext } from "src/context/AuthContext";
import { useContext } from "react";

export const Profile = observer(() => {
  const authService = useContext(AuthContext);
  const user = authService.currentUser;

  return (
    <Container>
      <div className="flex flex-col items-center justify-items-center content-center">
        <div className="w-full">
          <h5 className="font-bold text-lg text-black">First Name</h5>
          <p className="border p-1 w-full text-gray-600">{user?.firstName}</p>
        </div>
      </div>
    </Container>
  );
});
