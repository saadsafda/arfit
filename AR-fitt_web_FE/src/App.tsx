import { useEffect, useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ARfittProvider } from "./context/storeContext";
import HTTPService from "./services/base.service";
import LandingPage from "./pages/Landing page/landingPage";
import CONSTANTS from "./utils/constants/CONSTANTS";
import Cart from "./pages/Home page/Cart";
import Checkout from "./pages/Home page/Checkout";
import OrderDetails from "./pages/Home page/OrderDetails";

// Admin components
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-loaded components
const SignUp = lazy(() => import("./pages/SignUp/index"));
const LogIn = lazy(() => import("./pages/LogIn/logIn"));
const HomePage = lazy(() => import("./pages/Home page"));
const HomeLayout = lazy(() => import("./layouts/homePageLayout"));
const GetStarted = lazy(() => import("./pages/LogIn/getStarted"));
const CategoryPage = lazy(() => import("./pages/SignUp/categoryPage"));
const ResetPassword = lazy(() => import("./pages/LogIn/resetPassword"));
const ForgotPassword = lazy(() => import("./pages/LogIn/forgotPassword"));
const ItemDescription = lazy(() => import("./pages/Home page/itemDescription"));
const SuggestedItems = lazy(
  () => import("./pages/Home page/SuggestedItems/suggestedItems")
);
const TermsAndConditions = lazy(() =>
  import("./pages/TermsAndConditions/TermsAndConditions")
);

const DownloadApp = lazy(() => import("./pages/DownloadApp/index"));

const App = () => {
  const queryClient = new QueryClient();
  // eslint-disable-next-line
  const [token, _] = useState(localStorage.getItem(CONSTANTS.ACCESS_TOKEN));

  useEffect(() => {
    if (token) {
      HTTPService.setToken(token);
    }
  }, [token]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <ARfittProvider>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/getStarted" element={<GetStarted />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/categoryPage" element={<CategoryPage />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/download-app" element={<DownloadApp />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-details/:orderId" element={<OrderDetails />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    }
                  />

                  <Route path="/home" element={<HomeLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="suggestion" element={<SuggestedItems />} />
                    <Route path="item" element={<ItemDescription />} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
          </ARfittProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
