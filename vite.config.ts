import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { builtinModules } from "node:module";

const nodeBuiltins = Array.from(
  new Set(
    builtinModules.flatMap((mod) =>
      mod.startsWith("node:") ? [mod, mod.slice("node:".length)] : [mod, `node:${mod}`],
    ),
  ),
);

export default defineConfig({
  plugins: [
    devtools(),
    nitro(),
    {
      name: "nitro-node-builtins",
      configEnvironment(name, config) {
        if (name !== "nitro") {
          return;
        }
        config.resolve ??= {};
        config.resolve.builtins = nodeBuiltins;
        if (config.resolve.external !== true) {
          const externals = new Set(config.resolve.external ?? []);
          externals.add("gray-matter");
          config.resolve.external = Array.from(externals);
        }
      },
    },
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
