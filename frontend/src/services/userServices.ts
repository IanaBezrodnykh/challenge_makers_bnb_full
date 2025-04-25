import { UserIntf } from "../components/Profile";
// assigning variable BACKEND_URL to our backend url that is saved in .env within frontenv under variable VITE_BACKEND_URL:
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getLoggedInUserServiceFunc = async (): Promise<UserIntf> => {
    const response = await fetch(`${BACKEND_URL}/me`);
    if (response.status !== 200) {
        throw new Error("Unable to fetch your page!");
    }
    const data = await response.json();
    return data.document;
};
