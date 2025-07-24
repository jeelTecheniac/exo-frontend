import { useAuth } from "../context/AuthContext";
import { getRoute, RouteKey } from "../utils/roleBasedRoutes";

/**
 * Hook to get role-based route path by key
 */
export const useRoleRoute = () => {
  const { user } = useAuth();

  const resolve = (key: RouteKey): string => {
    return getRoute(key, user);
  };

  return { getRoute: resolve };
};
