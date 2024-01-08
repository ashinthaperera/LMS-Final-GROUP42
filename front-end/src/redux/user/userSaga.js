// import { useNavigate } from "react-router-dom";
import {
    // registerUserService,
    loginUserService,
    logoutUserService,
    getLogedUserService,
  } from "./userService";
  import {
     getUserAction,
    loginUserAction,
    logoutUserAction,
     refreshAction,
     saveUserAction,
  } from "./userSlice";
  

  import { takeEvery, call, put } from "redux-saga/effects";
  
  function* loginUserGenerator({ payload }) {
    
    try {
      const response = yield call(loginUserService, payload);
      if (response) {
        const userRole = response.data.role;
        console.log("Userrole",userRole)
        // const navigate = useNavigate();
        switch (userRole) {
          case 'student':
            payload.navigate('/student/dashboard');
            break;
          case 'admin':
            payload.navigate('/admin/dashboard');
            break;
          case 'lecturer':
            payload.navigate('/lecturer/dashboard');
            break;
          default:
            // Handle other roles or scenarios
            break;
        }
  
        // You may also want to dispatch an action indicating successful login
        // yield put(loginUserSuccess(response.data));


        // payload.navigate("/student/dashboard");
        window.location.reload(false); //coment
      } else {
        alert("Login Failed! Please Enter Valid Email & Password");
      }
    } catch (err) {
      alert("Login Failed! Please Enter Valid Email & Password");
    }
  }
  
  function* getLogedUserGenerator() {
    try {
      const response = yield call(getLogedUserService);
      if(response)
      yield put(saveUserAction(response));
    } catch (err) {
      console.log(err);
    }
  }
  
  function* logoutUserGenerator({ payload }) {
    try {
      const response = yield call(logoutUserService);
      if (response) {
        payload.navigate("/"); //logout location
        window.location.reload(false); //comment
      } else {
        alert("Your Session is Expired");
        payload.navigate("/");
       
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  function* refreshGenerator() {
    try {
      const response = yield call(getLogedUserService);
      if(response)
      yield put(saveUserAction(response));
    } catch (err) {
      console.log(err);
    }
  }
  
  function* allUsers() {
   // yield takeEvery(registerUserAction, registerUserGenerator);
    yield takeEvery(loginUserAction, loginUserGenerator);
    yield takeEvery(getUserAction, getLogedUserGenerator);
    yield takeEvery(logoutUserAction, logoutUserGenerator);
    yield takeEvery(refreshAction, refreshGenerator);
  }
  
  export default allUsers;
  