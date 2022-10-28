import { useEffect, useState } from "react";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Moubehealth</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
      <AppRoutes />
    </>
  );
}

export default App;
