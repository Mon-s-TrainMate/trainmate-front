export async function initMsw() {
  if (process.env.MSW !== 'true') return;
  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen();
    console.info('Mocking enabled.');
  }
}
