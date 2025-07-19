import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { MantineProvider, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "./themes/theme";

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

      <MantineProvider theme={theme} withGlobalClasses withCssVariables>
        <div>
          <Outlet />
          <Scripts />
        </div>
      </MantineProvider>
    </>
  );
}
