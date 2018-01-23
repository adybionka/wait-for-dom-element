const defaultOptions = {
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
        constlearInterval(checkInterval);
        clearTimeout(timeout);
        reject(Error('Getting element timeout'));
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