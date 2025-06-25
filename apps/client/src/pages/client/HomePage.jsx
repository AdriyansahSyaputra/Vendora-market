import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
        <Helmet title="Home" />

      <div className="text-center">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </>
  );
};

export default HomePage;
