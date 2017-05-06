// tsc src/*.ts --outDir public/javascripts/ --module system -w

declare const SystemJS;

// import { t2 } from './t2.js';

const t1 = () => {
  SystemJS.import('t2.js').then((t2) => t2.default());

  console.log('t1');
}

export default t1;
