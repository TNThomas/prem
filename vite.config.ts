import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/lib/**/*.{describe,expect,test,spec}.{js,ts}'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/src/routes/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
		]
	}
});
