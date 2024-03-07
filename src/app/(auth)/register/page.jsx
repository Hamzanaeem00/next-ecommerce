import React from "react";
import { Signup } from "../../../components/signup-page/signup";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const Register = async () => {
  // const session = getServerSession();
  // if (session) {
  //   redirect("/");
  // }
  return (
    <div>
      <Signup />
    </div>
  );
};

export default Register;
