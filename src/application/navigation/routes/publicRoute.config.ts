// Public Routes
export enum PublicRoutes {
  Splash = 'splash',
  Home = 'home',
}

// Public Routes Params
export type PublicRouteParamType = {
  [PublicRoutes.Splash]: undefined;
  [PublicRoutes.Home]: undefined;
};
