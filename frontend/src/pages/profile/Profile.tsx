import { Container } from "src/components";
import { observer } from "mobx-react-lite";
import { AuthContext } from "src/context/AuthContext";
import { useContext } from "react";

export const Profile = observer(() => {
  const authService = useContext(AuthContext);
  const user = authService.currentUser;

  if (user == null) {
    throw new Error("No user");
  }

  return (
    <Container>
      <div className="flex flex-col w-full items-center">
        <div className="w-full text-center md:w-4/5 lg:w-3/5 px-5 py-4 shadow border rounded-md my-1">
          <i className="fas fa-user-circle text-red-600 text-9xl"></i>
        </div>
        <ProfileField title={"First Name"} info={user.firstName} />
        <ProfileField title={"Last Name"} info={user.lastName} />
        <ProfileField title={"Email"} info={user.email} />
        <ProfileField title={"Document ID"} info={user.documentId} />
        <ProfileField title={"Role"} info={capitalize(user.role)} />
        <ProfileField
          title={"Created At"}
          info={new Date(user!.createdAt).toLocaleString()}
        />
        <ProfileField title={"Status"} info={capitalize(user.status)} />
      </div>
    </Container>
  );
});

function ProfileField(props: { title: string; info: string }) {
  return (
    <div className="w-full  md:w-4/5 lg:w-3/5 px-5 py-2 shadow border rounded-md my-1">
      <h5 className="font-bold text-lg text-red-600">{props.title}</h5>
      <p className="w-full font-semibold text-gray-500">{props.info}</p>
    </div>
  );
}

function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
