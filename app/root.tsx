import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export function HydrateFallback() {
  return (
    <>
      <p>Loading...</p>
      <Scripts />
    </>
  );
}

export default function Component() {
  return (
    <>
      <Links />

      <MantineProvider>
        <div>
          <Outlet />
          <Scripts />
        </div>
      </MantineProvider>
    </>
  );
}
