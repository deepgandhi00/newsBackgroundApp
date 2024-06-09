// TODO: add your protected routes
export enum ProtectedRoutes {
  Home = 'home',
}

export type ProtectedRouteParamType = {
  [ProtectedRoutes.Home]: undefined;
};
