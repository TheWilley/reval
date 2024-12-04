import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  base: '/reval/',
  envDir: './env',
  test: {
    globals: true,
    environment: 'jsdom',
  },
};
