import SignInButton from "../signIn_button/signIn_button.component";

const Unauthorized = () => {
  return (
    <div className="min-h-screen min-w-screen p-4 flex flex-col items-center justify-center text-[#edf0ef] bg-[#371e30]">
      <h1 className="text-3xl font-bold text-center">
        You're not authorized to access this app without an account
      </h1>
      <SignInButton />
    </div>
  );
};

export default Unauthorized;
