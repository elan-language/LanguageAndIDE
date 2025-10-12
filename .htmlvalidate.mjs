import { defineConfig } from "html-validate";

export default defineConfig({
  extends: ["html-validate:recommended"],
   rules: {
    "element-name": "off",
    "no-trailing-whitespace": "off"
  },
});