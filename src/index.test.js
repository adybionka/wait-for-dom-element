import querySelector, { error as globalError } from './';

const TEST_TEXT = 'It works!';

const options = {
  timeout: 1000,
  frequencyOfChecking: 200,
};

describe('querySelector', () => {
  it('should be defined', () => {
    expect(querySelector).toBeDefined();
  });

  describe('when calling querySelector("#content")', () => {
    let createdElement;

    afterEach(removeTestElement);

    it('should resolve with error if #content doest not exist', () => {
      expect.assertions(1);

      return querySelector('#content', options).catch((error) => expect(globalError).toEqual(error));
    });

    it('should resolve with desired element when getting by id', () => {
      expect.assertions(1);

      createdElement = createTestElement();

      return querySelector('#content', options).then((element) => expect(createdElement).toEqual(element));
    });

    it('should resolve with desired element by first class name', () => {
      expect.assertions(1);

      createdElement = createTestElement();

      return querySelector('.first', options).then((element) => expect(createdElement).toEqual(element));
    });

    it('should resolve with desired element by second class name', () => {
      expect.assertions(1);

      createdElement = createTestElement();

      return querySelector('.second', options).then((element) => expect(createdElement).toEqual(element));
    });

    it('should resolve with desired element by multiple class names', () => {
      expect.assertions(1);

      createdElement = createTestElement();

      return querySelector('.first.second.third', options).then((element) => expect(createdElement).toEqual(element));
    });

    it('should resolve with desired element when element appers in DOM with some delay but before timeout', () => {
      expect.assertions(1);

      setTimeout(() => {
        createdElement = createTestElement();
      }, 500);

      return querySelector('#content', options).then((element) => expect(createdElement).toEqual(element));
    });

    it('should resolve with error when element appers in DOM with some delay but after timeout', () => {
      let createdElement = null;

      expect.assertions(1);

      setTimeout(() => {
        createdElement = createTestElement();
      }, options.timeout + options.frequencyOfChecking);

      return querySelector('#content', options).catch((error) => expect(globalError).toEqual(error));
    });
  });
});

function createTestElement() {
  const element = document.createElement('div');
  const text = document.createTextNode(TEST_TEXT);

  element.id = 'content';
  element.classList.add('first');
  element.classList.add('second');
  element.classList.add('third');
  element.appendChild(text);

  document
    .getElementsByTagName('body')[0]
    .appendChild(element);

  return element;
}

function removeTestElement() {
  const element = document.getElementById('content');

  if (element) {
    document
      .getElementsByTagName('body')[0]
      .removeChild(element);
  }
}
