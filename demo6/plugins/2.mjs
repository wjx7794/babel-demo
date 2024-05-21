import * as t from '@babel/types';

const customPlugin = function (params) {
  console.log(params); // { a: 1 }
  return {
    pre(state) {
      this.cache = [];
      this.cache.push(params); // [{ a: 1 }]
    },
    // 访问器
    visitor: {
      Identifier(path) {
        // 取出最后一项
        const lastItem = this.cache[this.cache.length - 1];
        this.cache.push({ a: lastItem.a + 1 });
      },
    },
    post(state) {
      console.log(this.cache);
    },
  };
};

export default customPlugin;
