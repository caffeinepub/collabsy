import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './pages/HomePage';
import ForBrandsPage from './pages/ForBrandsPage';
import ForCreatorsPage from './pages/ForCreatorsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import BrandDashboardPage from './pages/BrandDashboardPage';
import CreatorDashboardPage from './pages/CreatorDashboardPage';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const forBrandsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/for-brands',
  component: ForBrandsPage,
});

const forCreatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/for-creators',
  component: ForCreatorsPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignUpPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const brandDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/brand-dashboard',
  component: BrandDashboardPage,
});

const creatorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator-dashboard',
  component: CreatorDashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  forBrandsRoute,
  forCreatorsRoute,
  signUpRoute,
  loginRoute,
  brandDashboardRoute,
  creatorDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
