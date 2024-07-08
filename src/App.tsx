import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import {
  AuthPage,
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from '@refinedev/mui'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { dataProvider } from '@refinedev/supabase'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { ColorModeContextProvider } from './contexts/color-mode'
import {
  BookingsCreate,
  BookingsEdit,
  BookingsList,
  BookingsShow,
} from './pages/bookings'
import {
  GuestsCreate,
  GuestsEdit,
  GuestsList,
  GuestsShow,
} from './pages/guests'
import { RoomsCreate, RoomsEdit, RoomsList, RoomsShow } from './pages/rooms'
import { supabaseClient } from './utility'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                // liveProvider={liveProvider(supabaseClient)}
                // authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: 'bookings',
                    list: '/bookings',
                    create: '/bookings/create',
                    edit: '/bookings/edit/:id',
                    show: '/bookings/show/:id',
                    meta: { canDelete: true },
                  },
                  {
                    name: 'guests',
                    list: '/guests',
                    create: '/guests/create',
                    edit: '/guests/edit/:id',
                    show: '/guests/show/:id',
                    meta: { canDelete: true },
                  },
                  {
                    name: 'rooms',
                    list: '/rooms',
                    create: '/rooms/create',
                    edit: '/rooms/edit/:id',
                    show: '/rooms/show/:id',
                    meta: { canDelete: true },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'VeqEWg-Qbn8FE-8O4HEM',
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="rooms" />}
                    />
                    <Route path="/bookings">
                      <Route index element={<BookingsList />} />
                      <Route path="create" element={<BookingsCreate />} />
                      <Route path="edit/:id" element={<BookingsEdit />} />
                      <Route path="show/:id" element={<BookingsShow />} />
                    </Route>
                    <Route path="/guests">
                      <Route index element={<GuestsList />} />
                      <Route path="create" element={<GuestsCreate />} />
                      <Route path="edit/:id" element={<GuestsEdit />} />
                      <Route path="show/:id" element={<GuestsShow />} />
                    </Route>
                    <Route path="/rooms">
                      <Route index element={<RoomsList />} />
                      <Route path="create" element={<RoomsCreate />} />
                      <Route path="edit/:id" element={<RoomsEdit />} />
                      <Route path="show/:id" element={<RoomsShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            defaultValues: {
                              email: 'info@refine.dev',
                              password: 'refine-supabase',
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
