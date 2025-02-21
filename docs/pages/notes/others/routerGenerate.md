---
title: 动态生成路由
---


# 动态生成路由

vue3+vite3根据目录动态生成路由

## 页面层级
```text
├── App.vue
├── main.ts
├── router
│   ├── index.ts
│   └── pTest.ts
├── store
│   └──test.store.ts
├── utils
│   ├── index.ts
│   ├── ...
│   └── interceptor.ts
└── views
    ├── pTest
    │   ├── components
    │   ├── test
    │   │   └── testA.vue
    │   ├── testA.vue
    │   └── testB.vue
    └── pageQuickIn.vue
```


## routerGenerate

- 约定如下:
- 例：页面如下 views/pTest/testA
  - 1: path => pTest/testA
  - 2: name => PTestTestA
  - 3: meta => pagesOptions中配置

```ts
import { RouteRecordRaw } from 'vue-router';

/**
 * 动态生成路由
 * @param viteModules https://cn.vitejs.dev/guide/features#glob-import
 */
export function routerGenerate(viteModules: Record<string, () => Promise<any>>, pagesOptions: any = {}): Array<RouteRecordRaw> {
  // 过滤掉components下的vue文件
  const _viteModules = Object.keys(viteModules)
    .filter((key) => !key.includes('components'))
    .reduce((acc, key) => {
      acc[key] = viteModules[key];
      return acc;
    }, {} as typeof viteModules);

  const routes: Array<RouteRecordRaw> = Object.entries(_viteModules).map(([modulePath, component]) => {
    // path 页面路由 目录路径 如：/pTest/testA
    const path = modulePath.replace('../views', '').replace('.vue', '') || '/';
    // 目录层级拆分 ['',pTest,testA],['',pTest,test,testA],
    const pathArr = path.split('/');
    const pathArrLen = pathArr.length;
    // 模块文件目录层级-数组形式 [pTest,testA],[pTest,test,testA]
    const nameArr = pathArr.slice(1, pathArrLen);
    // console.log(nameArr);
    const name = nameArr
      .map((_e) => {
        return _e.replace(/^[a-z]/, (match) => match.toUpperCase());
      })
      .join(''); // 页面name 路径拼接-驼峰 PTestTestA PTestTestTestA
    // 当前页面配置 routeNameArr.join('/')页面所在分包path 用于匹配页面配置
    const currentPageOptions = pagesOptions[pathArr.slice(2, pathArrLen).join('/')];
    // console.log(currentPageOptions);
    return {
      path: path + (currentPageOptions?.routeParam || ''),
      meta: currentPageOptions?.meta || {},
      name,
      component,
    };
  });
  // console.log(routes);
  return routes;
}

```


## pTest.router

```ts
import { RouteRecordRaw } from 'vue-router';
import { routerGenerate } from '@/common/utils';

// pagesOptions
const pTestPagesOptions = {
  // testA: {
  //   meta: {
  //     title: '测试页面A',
  //     KeepAlive: true,
  //   },
  // },
  // 'test/testA': {
  //   meta: {
  //     title: '测试页面A',
  //     KeepAlive: true,
  //   },
  //   routeParam: '/:id',
  // },
};
const routes: Array<RouteRecordRaw> = routerGenerate(import.meta.glob('../views/pTest/**/*.vue'), pTestPagesOptions);
export default routes;
```

## createRouter
```ts
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import pTest from './pTest';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'pageQuickIn',
    meta: {
      title: '',
      keepAlive: false,
    },
    component: () => import('../views/pageQuickIn.vue'),
    // redirect: '/pTest/testA',
    children: [],
  },
  ...pTest,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```