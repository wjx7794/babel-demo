// import * as t from '@babel/types';

const customPlugin = function ({ types: t }, options) {
  return {
    // 访问器
    visitor: {
      StringLiteral(path, state) {
        // 将所有 StringLiteral 节点对应的 path 对象收集起来，存到 state 对象里，
        // 以便于在遍历结束时能统计相同字符串的重复次数
        state.stringPathMap = state.stringPathMap || {};

        const nodes = state.stringPathMap[path.node.value] || [];
        nodes.push(path);

        state.stringPathMap[path.node.value] = nodes;
      },
      Program: {
        // 将在遍历过程的退出阶段被调用
        // Program 节点是顶层 AST 节点，可以认为 Program.exit 是最后一个执行的 visitor 函数
        exit(path, state) {
          // 插件参数。还可以通过 state.opts 拿到插件参数
          const { minCount = 2 } = options || {};

          for (const [string, paths] of Object.entries(
            state.stringPathMap || {}
          )) {
            // 对于重复次数少于 minCount 的 Path，不做处理
            if (paths.length < minCount) {
              continue;
            }

            // 基于给定的字符串创建一个唯一的标识符
            const id = path.scope.generateUidIdentifier(string); // 将所有相同的字符串字面量替换为上面生成的标识符
            paths.forEach((p) => {
              p.replaceWith(id);
            });

            // 将标识符添加到顶层作用域中
            path.scope.push({ id, init: t.stringLiteral(string) });
          }
        },
      },
    },
  };
};

export default customPlugin;
