import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import PageLayout from "@/components/Layout/PageLayout";

const App = () => {
  return (
    <PageLayout>
      Prism Protocol
      <ConnectButton />
    </PageLayout>
  );
};

export default App;
