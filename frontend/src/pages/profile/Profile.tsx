import { Container } from "src/components";
import { observer } from "mobx-react-lite";
import { AuthContext } from "src/context/AuthContext";
import { useContext } from "react";

export const Profile = observer(() => {
  const authService = useContext(AuthContext);
  const user = authService.currentUser;

  return (
    <Container>
      <div className="flex flex-col items-center w-3/5">
        <div>
          <h5 className="font-bold text-lg text-gray-500">First Name</h5>
          <p className="border border-gray-200">{user?.firstName}</p>
        </div>
      </div>
    </Container>
  );
});
