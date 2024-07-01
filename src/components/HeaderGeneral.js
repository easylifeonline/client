import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import HeaderNonRegisteredUsers from "./HeaderNonRegisteredUsers";
import HeaderRegisteredUsers from "./HeaderRegisteredUsers";
import HeaderVendors from "./HeaderVendors";
import HeaderAdmin from "./HeaderAdmin";
import api from "../helpers/api";

const GeneralHeader = () => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const response = await api.get("profile/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          localStorage.removeItem("access_token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <HeaderNonRegisteredUsers />;
  }

  switch (user.role) {
    case "admin":
      return <HeaderAdmin />;
    case "vendor":
      return <HeaderVendors />;
    case "customer":
      return <HeaderRegisteredUsers />;
    default:
      return <HeaderNonRegisteredUsers />;
  }
};

export default GeneralHeader;