const routesNames = {
  home: "",
  login: "login",
  error404: "404"
};

export const RoutesConfig: any = {
  routesName: routesNames,
  routes: {
    home: `/${routesNames.home}`,
    login: `/${routesNames.login}`,
    error404: `/${routesNames.error404}`
  }
};