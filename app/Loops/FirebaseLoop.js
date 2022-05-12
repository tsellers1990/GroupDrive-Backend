import * as staticRefs from '../FirebaseCalls/staticRefs'

let count = 0;

const loopInitializer = () => {
  console.log(`loop initialized, you've looped this ${count} times`);
  count++;
  loopSpeedLimiter();
};

const loopSpeedLimiter = () => {
  setTimeout(() => {
    loopInitializer();
  }, 100);
};

// loopInitializer();



