import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";

import { getRouter } from "./router";

startTransition(() => {
  const staticRoot = document.getElementById("root");

  if (staticRoot) {
    createRoot(staticRoot).render(
      <StrictMode>
        <RouterProvider router={getRouter()} />
      </StrictMode>,
    );
    return;
  }

  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});