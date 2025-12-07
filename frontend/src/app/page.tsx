import React from "react";

import Button from "@/components/Button/Button";
import PageLayout from "@/components/Layout/PageLayout";

const App = () => {
  return (
    <PageLayout>
      <div className="m-10 space-x-3">
        <Button className="w-40">Approve</Button>
        <Button variant="secondary" className="w-40">
          Swap
        </Button>
      </div>
    </PageLayout>
  );
};

export default App;
