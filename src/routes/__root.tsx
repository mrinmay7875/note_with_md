import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '5vh',
        }}
      >
        <Link to='/' style={{ marginRight: '10px', fontSize: '1rem' }}>
          Home
        </Link>

        <Link to='/tags' style={{ marginRight: '10px', fontSize: '1rem' }}>
          Tags
        </Link>
        <Link to='/about' style={{ marginRight: '10px', fontSize: '1rem' }}>
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
