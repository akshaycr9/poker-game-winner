import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/poker-game-winner/",
// });

export default defineConfig(({}) => {
  // if (command === "build") {
  return {
    plugins: [react()],
    base: "/poker-game-winner/",
  };
  // } else {
  //   return {
  //     plugins: [react()],
  //   };
  // }
});
