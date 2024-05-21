import * as t from '@babel/types';

const anotherVisitor = {
  Identifier(path) {
    const lastItem = this.collect[this.collect.length - 1];
    this.collect.push({ a: lastItem.a + 1 });
  },
};

const customPlugin = function (params) {
  const collect = [];
  collect.push(params); // [{ a:1 }]

  return {
    // 访问器
    visitor: {
      FunctionDeclaration(path, state) {
        // state.cwd: 当前执行目录
        // state.opts: 插件 options
        // state.filename: 当前文件名(绝对路径)
        // state.file: BabelFile 对象，包含当前整个 ast，当前文件内容 code，etc.
        // state.key: 当前插件名字
        console.log(state);
        path.traverse(anotherVisitor, { params, collect });
      },
    },
    post() {
      console.log(collect); // [ { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 } ]
    },
  };
};

export default customPlugin;
