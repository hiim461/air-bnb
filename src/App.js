import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout/AdminLayout";
const AuthLayout = lazy(() => import("./layouts/AuthLayout/AuthLayout.jsx"));
const SignIn = lazy(() => import("./modules/Auth/Signin/Signin.jsx"));
const SignUp = lazy(() => import("./modules/Auth/Signup/Signup.jsx"));
const Home = lazy(() => import("./modules/Home/Home.jsx"));
const AirDetails = lazy(() => import("./modules/AirDetails/AirDetails.jsx"));
const Erros = lazy(() => import("./modules/Error/Error.jsx"));
const UserInfoLayout = lazy(() =>
  import("./layouts/UserInfoLayout/UserInfoLayout")
);
const BookingHistory = lazy(() =>
  import("./modules/BookingHistory/BookingHistory.jsx")
);
const AdminRoomList = lazy(() =>
  import("./modules/Admin/AdminRoomList/AdminRoomList.jsx")
);
const AdminAddRoom = lazy(() =>
  import("./modules/Admin/AdminAddRoom/AdminAddRoom.jsx")
);
const AdminDescList = lazy(() =>
  import("./modules/Admin/AdminDescList/AdminDescList.jsx")
);
const AdminAddDesc = lazy(() =>
  import("./modules/Admin/AdminAddDesc/AdminAddDesc.jsx")
);
const AdminUserList = lazy(() =>
  import("./modules/Admin/AdminUserList/AdminUserList.jsx")
);
const AdminAddUser = lazy(() =>
  import("./modules/Admin/AdminAddUser/AdminAddUser.jsx")
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center">
          <img src="/img/loading.gif" class="img-fluid" alt="" />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="phong-thue/:id" element={<AirDetails />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route
            path="/user/user-info/:userID"
            element={
              <ProtectedRoute>
                <UserInfoLayout />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<UserInfoLayout />} />

            <Route path="history" element={<BookingHistory />} />

            <Route path="user-list" element={<AdminUserList />} />
            <Route path="add-user" element={<AdminAddUser />} />

            <Route path="room-list" element={<AdminRoomList />} />
            <Route path="add-room" element={<AdminAddRoom />} />

            <Route path="desc-list" element={<AdminDescList />} />
            <Route path="add-desc" element={<AdminAddDesc />} />
          </Route>
          <Route path="*" element={<Erros />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
