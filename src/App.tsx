import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "./components/spinner/spinner.component";

import { checkUserSession } from "./store/user/user.reducer";

const Home = lazy(() => import("./routes/home/home.component"));
const Navbar = lazy(() => import("./routes/navbar/navbar.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Support = lazy(() => import("./routes/support/support.component"));
const TOS = lazy(() => import("./routes/tos/tos.component"));
const Privacy = lazy(() => import("./routes/privacy/privacy.component"));
// const SignUp = lazy(() => import('./routes/sign-up/sign-up.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="support" element={<Support />} />
          <Route path="terms-of-service" element={<TOS />} />
          <Route path="privacy" element={<Privacy />} />
          {/* <Route path='signup' element={<SignUp />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
