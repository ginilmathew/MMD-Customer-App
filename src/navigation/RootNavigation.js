import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getCurrentScreenPath() {
  if (navigationRef.isReady()) {
    const state = navigationRef.dangerouslyGetState();
    const currentRoute = state?.routes[state?.index];

    // Extract the path from the current route
    const screenPath = currentRoute?.name;

    return screenPath;
  }

  return null;
}