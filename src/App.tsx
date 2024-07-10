import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import {
  AuthPage,
  ErrorComponent,
  RefineSnackbarProvider,
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
import { ThemedLayoutV2 } from './components/layout'
import { ThemedHeaderV2 } from './components/layout/header'
import { ThemedSiderV2 } from './components/layout/sider'
import { ThemedTitleV2 } from './components/layout/title'
import {
  BookingCreate,
  BookingEdit,
  BookingList,
  BookingShow,
} from './pages/booking'
import { GuestCreate, GuestEdit, GuestList, GuestShow } from './pages/guest'
import { RoomCreate, RoomEdit, RoomList, RoomShow } from './pages/room'
import theme from './theme'
import { supabaseClient } from './utility'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                          <ThemedLayoutV2
                            Header={ThemedHeaderV2}
                            Sider={ThemedSiderV2}
                            Title={ThemedTitleV2}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        index
                        element={<NavigateToResource resource="bookings" />} // TODO: set resource to dashboard
                      />
                      <Route path="/bookings">
                        <Route index element={<BookingList />} />
                        <Route path="create" element={<BookingCreate />} />
                        <Route path="edit/:id" element={<BookingEdit />} />
                        <Route path="show/:id" element={<BookingShow />} />
                      </Route>
                      <Route path="/guests">
                        <Route index element={<GuestList />} />
                        <Route path="create" element={<GuestCreate />} />
                        <Route path="edit/:id" element={<GuestEdit />} />
                        <Route path="show/:id" element={<GuestShow />} />
                      </Route>
                      <Route path="/rooms">
                        <Route index element={<RoomList />} />
                        <Route path="create" element={<RoomCreate />} />
                        <Route path="edit/:id" element={<RoomEdit />} />
                        <Route path="show/:id" element={<RoomShow />} />
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
          </LocalizationProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
