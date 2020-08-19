import random from "faker/lib/random";

export const randomNum = (min = 0, max = 800) => {
  return random().number({ min, max });
};
