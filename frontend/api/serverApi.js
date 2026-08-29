import clientServer from "@/app/config/clientServer";

export const fetchMe = async (token) => {
  try {
    const response = await clientServer.get("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      return response.data.currentUserProfile;
    } else {
      return response.data.currentUserProfile || {};
    }
  } catch (error) {
    console.error("Error fetching current user: ", error);
  }
};

