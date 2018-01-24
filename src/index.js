export const error = Error('Getting element timeout');
export const defaultOptions = {
  frequencyOfChecking: 200,
  timeout: 15000,
};

export default function querySelector(selectors, customOptions) {
  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        reject(error);
      },
      options.timeout
    );

    const checkInterval = setInterval(
      () => {
        const element = document.querySelector(selectors);

        if (element) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          resolve(element);
        }
      },
      options.frequencyOfChecking
    );
  });
}
