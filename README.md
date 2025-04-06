# ArcoDesign Vue 按需引入与类型提示说明

## 1. ArcoDesign 配置按需导入与类型提示支持

为了实现按需加载组件并获得模板中的类型提示，推荐使用 [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) 插件进行自动导入和类型声明生成。

### 安装依赖

```bash
npm install -D unplugin-vue-components
```

### 配置示例（Vite/Nuxt）

以下是 `vite.config.ts` 或 `nuxt.config.ts` 的配置示例：

```typescript
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ArcoResolver()],
      dts: 'components.d.ts', // 自动生成类型声明文件
    }),
  ],
})
```

配置完成后，`components.d.ts` 会在开发模式（`vite dev`）或构建时自动生成，内容声明了全局组件类型，提升 IDE 类型补全体验。

### 示例

配置完成后，可以在 `<template>` 中直接使用组件而无需手动 `import`：

```vue
<template>
  <AButton>按钮</AButton>
  <ASelect v-model="value" />
</template>
```

---

## 2. ArcoDesign 类型限制说明

尽管 `unplugin-vue-components` 会自动声明全局组件，但由于 ArcoDesign 组件库的导出结构问题，通过如下方式声明组件类型仍有一定局限性：

```typescript
ASelect: typeof import('@arco-design/web-vue')['Select']
```

这种 `typeof Select` 的方式只能获取到组件构造函数，无法获取 `props`、`emits`、`slots` 的详细类型信息，导致以下问题：

- `<template>` 中组件的 `props`、事件、`slots` 无法精确类型提示。
- 默认补全效果有限（有时显示为 `any`）。

---

## 推荐做法

| 场景                              | 推荐方 式                                         |
| --------------------------------- | ------------------------------------------------- |
| 需要模板中全局组件名称补全        | 使用 `unplugin-vue-components` + `dts`            |
| 需要精准的 `props` 类型提示       | 在 `<script setup>` 中手动 `import` 组件和类型    |
| 高级类型支持（如 `v-model` 推断） | 封装组件并显式定义 `props`/`emits`                |
| 使用 Volar 插件                   | 推荐启用，并在 `tsconfig.json` 中加入类型声明路径 |

### tsconfig.json 示例

以下是 `tsconfig.json` 的配置示例：

```json
{
  "compilerOptions": {
    "types": ["vue", "unplugin-vue-components/types"]
  }
}
```

---

## 结语

如果你追求最佳的开发体验，建议：

- 使用按需自动导入减少样板代码。
- 针对关键业务组件，手动声明类型或封装组件，获得完整类型提示。

---
