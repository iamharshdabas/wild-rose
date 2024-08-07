import { ThemeProvider, Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
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
import { dataProvider, liveProvider } from '@refinedev/supabase'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import authProvider from './authProvider'
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
import Dashboard from './pages/dashboard'
import { GuestCreate, GuestEdit, GuestList, GuestShow } from './pages/guest'
import { RoomCreate, RoomEdit, RoomList, RoomShow } from './pages/room'
import theme from './theme'
import { supabaseClient } from './utility'
import {
  DashboardRounded,
  PersonRounded,
  TurnedInRounded,
  VillaRounded,
} from '@mui/icons-material'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RefineSnackbarProvider>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  resources={[
                    {
                      name: 'dashboard',
                      list: '/',
                      meta: { icon: <DashboardRounded />, lable: 'Dashboard' },
                    },
                    {
                      name: 'bookings',
                      list: '/bookings',
                      create: '/bookings/create',
                      edit: '/bookings/edit/:id',
                      show: '/bookings/show/:id',
                      meta: { icon: <TurnedInRounded />, canDelete: true },
                    },
                    {
                      name: 'guests',
                      list: '/guests',
                      create: '/guests/create',
                      edit: '/guests/edit/:id',
                      show: '/guests/show/:id',
                      meta: { icon: <PersonRounded />, canDelete: true },
                    },
                    {
                      name: 'rooms',
                      list: '/rooms',
                      create: '/rooms/create',
                      edit: '/rooms/edit/:id',
                      show: '/rooms/show/:id',
                      meta: { icon: <VillaRounded />, canDelete: true },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    liveMode: 'auto',
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
                      <Route index element={<Dashboard />} />
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
                            title={<ThemedTitleV2 collapsed={false} />}
                            type="login"
                            formProps={{
                              defaultValues: {
                                email: 'xoxo@blackrose.com',
                                password: 'xoxo',
                              },
                            }}
                          />
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <AuthPage
                            title={<ThemedTitleV2 collapsed={false} />}
                            type="register"
                          />
                        }
                      />
                      <Route
                        path="/forgot-password"
                        element={
                          <AuthPage
                            title={<ThemedTitleV2 collapsed={false} />}
                            type="forgotPassword"
                          />
                        }
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
