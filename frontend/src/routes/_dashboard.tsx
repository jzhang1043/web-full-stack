import { Outlet, createFileRoute } from "@tanstack/react-router"
// import Sidebar from "../components/Common/Sidebar"
// import UserMenu from "../components/Common/UserMenu"
// import useAuth, { isLoggedIn } from "../hooks/useAuth"

export const Route = createFileRoute("/_dashboard")({
  component: Layout,
})

function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}
