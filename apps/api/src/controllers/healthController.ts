// Health controller placeholder
export const healthCheck = () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString()
  };
};