export default defineNuxtRouteMiddleware(() => {
  const { initAuth } = useAuth();
  initAuth();
});
