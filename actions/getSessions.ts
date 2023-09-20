import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getSessions = async () => {
  return await getServerSession(authOptions);
};

export default getSessions;
