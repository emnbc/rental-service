import axios from "axios";
import { AppLocalStore } from "../utils/app-local-store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, fetchCurrentUser } from "../reducers/current-user-slice";

const authorizedClient = axios.create();

authorizedClient.interceptors.request.use(
  (config) => {
    const token = AppLocalStore.getToken();
    token && config.headers.set("Authorization", "Bearer " + token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosInterceptor = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = AppLocalStore.getToken();
    const resInterceptor = (response) => response;
    const errInterceptor = (error) => {
      if (error.response?.status === 401) {
        AppLocalStore.setToken("");
      }
      return Promise.reject(error);
    };
    const interceptor = authorizedClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    if (!userState.isLoggedIn && token) {
      dispatch(fetchCurrentUser()).then(() => {
        setIsChecking(false);
      });
    } else {
      setIsChecking(false);
    }

    return () => authorizedClient.interceptors.response.eject(interceptor);
  }, [navigate, dispatch, userState.isLoggedIn]);

  return isChecking ? <div>Загрузка...</div> : children;
};

export const Auth = {
  signIn: (data) => {
    return axios.post("/api/auth/sign_in", data);
  },
  signUp: (data) => {
    return axios.post("/api/auth/sign_up", data);
  },
  auth: () => {
    return authorizedClient.get("/api/auth/");
  },
};

export const Cases = {
  fetch: () => {
    return authorizedClient.get("/api/cases");
  },
  create: (data) => {
    return authorizedClient.post("/api/cases", data);
  },
  publicReport: (data) => {
    return authorizedClient.post("/api/public/report", data);
  },
  getCase: (id) => {
    return authorizedClient.get(`/api/cases/${id}`);
  },
  updateCase: (id, data) => {
    return authorizedClient.put(`/api/cases/${id}`, data);
  },
  deleteCase: (id) => {
    return authorizedClient.delete(`/api/cases/${id}`);
  },
};

export const Officers = {
  fetch: () => {
    return authorizedClient.get("/api/officers");
  },
  create: (data) => {
    return authorizedClient.post("/api/officers", data);
  },
  getOfficer: (id) => {
    return authorizedClient.get(`/api/officers/${id}`);
  },
  updateOfficer: (id, data) => {
    return authorizedClient.put(`/api/officers/${id}`, data);
  },
  deleteOfficer: (id) => {
    return authorizedClient.delete(`/api/officers/${id}`);
  },
};
