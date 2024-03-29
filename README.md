# 概述
本工程演示了一种太阳能面板相对高效的布局方法。
首先说明一下，太阳能面板布局是二维装箱问题的一个特例，属于NP-hard问题，理论上是无法求出最优解的。目前最好的解决思路还是借助AI,但这超出现阶段的规划。
在当前资源条件下，特设定该布局方法。

# 算法说明
本算法属于暴力算法，以下是流程：
* 1、选取基准点。当前的策略是，遍历多边形所有顶点，取x,y轴最小值。
* 2，设定dx,dy，nx,ny后，循环选定单次基准点
* 3，基于当次基准点开始排布太阳能板。通过 多边形右下角坐标算出需要判断的太阳能板。
   然后每个太阳能板判断是否在多边形内，是否与障碍物接触。
* 4，分析并返回最优解，以数量及居中程度排序。

# 项目说明
本项目基于vite + vue3 + fabric
启动项目后， 在左侧画布上绘制屋顶后，等待一段时间后，即可完成排布
   





# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
