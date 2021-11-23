export let firstMenu
export default function(userMenus) {
  const routes = []
  const allRoutes = []
  const routesFile = require.context('../router/main', true, /\.js/)
  routesFile.keys().forEach((item) => {
    const route = require('../router/main' + item.substr(1))
    allRoutes.push(route.default)
  })
  const _recurse = (userMenus) => {
    for (const menu of userMenus) {
      if (menu.pid !== null || !menu.children.length) {
        const route = allRoutes.find((item) => item.path === menu.path)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu.path
        }
      } else {
        _recurse(menu.children)
      }
    }
  }
  _recurse(userMenus)
  return routes
}

export function getActiveIndex(currentPath, userMenus) {
  const _recurse = (userMenus) => {
    for (const menu of userMenus) {
      if (menu.pid !== null || !menu.children.length) {
        if (menu.path === currentPath) {
          return menu.id
        }
      } else {
        const itemId = _recurse(menu.children)
        if (itemId) {
          return itemId
        }
      }
    }
  }
  return _recurse(userMenus)
}

export function getBreakCrumbs(currentPath, userMenus) {
  const _recurse = (userMenus) => {
    for (const menu of userMenus) {
      if (menu.pid !== null || !menu.children.length) {
        if (menu.path === currentPath) {
          return menu
        }
      } else {
        const item = _recurse(menu.children)
        if (item) {
          return item
        }
      }
    }
  }
  return _recurse(userMenus)
}