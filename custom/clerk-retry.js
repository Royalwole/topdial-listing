export function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    let lastError;

    function attempt(n) {
      fn()
        .then(resolve)
        .catch((err) => {
          lastError = err;
          console.warn(`Retry attempt ${retries - n + 1} failed:`, err.message);
          
          if (n === 0) {
            console.error('All retry attempts failed:', lastError);
            reject(lastError);
          } else {
            const nextDelay = delay * (retries - n + 1); // Exponential backoff
            console.log(`Retrying in ${nextDelay}ms...`);
            setTimeout(() => attempt(n - 1), nextDelay);
          }
        });
    }

    attempt(retries);
  });
}

export const withRetry = (fn, options = {}) => {
  const { retries = 3, delay = 1000 } = options;
  return (...args) => retry(() => fn(...args), retries, delay);
};
