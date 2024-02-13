import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
	workspaceFolder: 'src/test/milestone-1-files',
	mocha: {
		timeout: 30000
	  }
});
