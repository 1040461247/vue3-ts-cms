/// <reference types="vite/client" />

// 声明.vue模块是一个组件，而不要把它当成any类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module '*.mjs'
