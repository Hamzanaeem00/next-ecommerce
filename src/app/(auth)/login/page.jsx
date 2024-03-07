import React from "react";
import Login from "../../../components/login-page/login";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const LoggedIn = async () => {
  // const session = getServerSession();
  // if (session) {
  //   redirect("/");
  // }
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoggedIn;
