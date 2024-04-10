import { Outlet, createRootRoute } from "@tanstack/react-router"
import React, { Suspense } from "react"
import NotFound from "../components/common/notfound"

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right"/>
      </Suspense>
    </>
  ),
  notFoundComponent: () => <NotFound />,
})
