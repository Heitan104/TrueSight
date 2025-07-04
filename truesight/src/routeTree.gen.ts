/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as ResponsesRouteImport } from './routes/responses'
import { Route as FormRouteImport } from './routes/form'
import { Route as IndexRouteImport } from './routes/index'
import { Route as DemoTanstackQueryRouteImport } from './routes/demo.tanstack-query'

const ResponsesRoute = ResponsesRouteImport.update({
  id: '/responses',
  path: '/responses',
  getParentRoute: () => rootRouteImport,
} as any)
const FormRoute = FormRouteImport.update({
  id: '/form',
  path: '/form',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const DemoTanstackQueryRoute = DemoTanstackQueryRouteImport.update({
  id: '/demo/tanstack-query',
  path: '/demo/tanstack-query',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/form': typeof FormRoute
  '/responses': typeof ResponsesRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/form': typeof FormRoute
  '/responses': typeof ResponsesRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/form': typeof FormRoute
  '/responses': typeof ResponsesRoute
  '/demo/tanstack-query': typeof DemoTanstackQueryRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/form' | '/responses' | '/demo/tanstack-query'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/form' | '/responses' | '/demo/tanstack-query'
  id: '__root__' | '/' | '/form' | '/responses' | '/demo/tanstack-query'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FormRoute: typeof FormRoute
  ResponsesRoute: typeof ResponsesRoute
  DemoTanstackQueryRoute: typeof DemoTanstackQueryRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/responses': {
      id: '/responses'
      path: '/responses'
      fullPath: '/responses'
      preLoaderRoute: typeof ResponsesRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/form': {
      id: '/form'
      path: '/form'
      fullPath: '/form'
      preLoaderRoute: typeof FormRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/demo/tanstack-query': {
      id: '/demo/tanstack-query'
      path: '/demo/tanstack-query'
      fullPath: '/demo/tanstack-query'
      preLoaderRoute: typeof DemoTanstackQueryRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FormRoute: FormRoute,
  ResponsesRoute: ResponsesRoute,
  DemoTanstackQueryRoute: DemoTanstackQueryRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
