// vite.config.ts
import { sveltekit } from "file:///C:/Users/ashto/Documents/prem/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///C:/Users/ashto/Documents/prem/node_modules/vitest/dist/config.js";
var vite_config_default = defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["tests/lib/**/*.{describe,expect,test,spec}.{js,ts}"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/src/routes/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhc2h0b1xcXFxEb2N1bWVudHNcXFxccHJlbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYXNodG9cXFxcRG9jdW1lbnRzXFxcXHByZW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FzaHRvL0RvY3VtZW50cy9wcmVtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKV0sXHJcblx0dGVzdDoge1xyXG5cdFx0aW5jbHVkZTogWyd0ZXN0cy9saWIvKiovKi57ZGVzY3JpYmUsZXhwZWN0LHRlc3Qsc3BlY30ue2pzLHRzfSddLFxyXG5cdFx0ZXhjbHVkZTogW1xyXG5cdFx0XHQnKiovbm9kZV9tb2R1bGVzLyoqJyxcclxuXHRcdFx0JyoqL2Rpc3QvKionLFxyXG5cdFx0XHQnKiovc3JjL3JvdXRlcy8qKicsXHJcblx0XHRcdCcqKi9jeXByZXNzLyoqJyxcclxuXHRcdFx0JyoqLy57aWRlYSxnaXQsY2FjaGUsb3V0cHV0LHRlbXB9LyoqJyxcclxuXHRcdFx0JyoqL3trYXJtYSxyb2xsdXAsd2VicGFjayx2aXRlLHZpdGVzdCxqZXN0LGF2YSxiYWJlbCxueWMsY3lwcmVzcyx0c3VwLGJ1aWxkfS5jb25maWcuKidcclxuXHRcdF1cclxuXHR9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1SLFNBQVMsaUJBQWlCO0FBQzdTLFNBQVMsb0JBQW9CO0FBRTdCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUNyQixNQUFNO0FBQUEsSUFDTCxTQUFTLENBQUMsb0RBQW9EO0FBQUEsSUFDOUQsU0FBUztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
