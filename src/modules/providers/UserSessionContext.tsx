"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  API_GetProfile,
  IRs_GetProfile,
  T_UserMe,
} from "@/api/services/auth/api.get.profile";

type InitialValueProps = {
  user: T_UserMe | null;
  token: string | undefined;
  deviceId: string | undefined;
  revalidate: () => void;
  isModalDisplay: boolean;
  setIsModalDisplay: (value: boolean) => void;
};

const initialValue: InitialValueProps = {
  user: null,
  token: undefined,
  deviceId: undefined,
  revalidate: () => {},
  isModalDisplay: false,
  setIsModalDisplay: () => {},
};

const UserSessionContext = React.createContext(initialValue);

const useUserSessionContext = (
  token: string | undefined,
  deviceId: string | undefined
) => {
  const pathname = usePathname();
  const [user, setUser] = useState<T_UserMe | null>(null);
  const [isModalDisplay, setIsModalDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const getUserMe = (await API_GetProfile()) as IRs_GetProfile;
      setUser(getUserMe?.data || null);
    })();
  }, [token, pathname]);

  const revalidate = async () => {
    const getUserMe = (await API_GetProfile()) as IRs_GetProfile;
    setUser(getUserMe?.data || null);
  };

  return {
    user,
    token,
    deviceId,
    revalidate,
    isModalDisplay,
    setIsModalDisplay,
  };
};

const UserSessionProvider = (props: {
  children: React.ReactNode;
  token: string;
  deviceId: string;
}) => {
  const { Provider } = UserSessionContext;
  const hookValue = useUserSessionContext(props.token, props.deviceId);

  return <Provider value={hookValue}>{props.children}</Provider>;
};

export { UserSessionContext, UserSessionProvider };
