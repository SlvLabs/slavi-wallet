import ROUTES from './config/routes';
type All<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : All<T[P]>;
}[keyof T];
export type Routes = All<typeof ROUTES>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends Record<Routes, unknown> {}
  }
}
