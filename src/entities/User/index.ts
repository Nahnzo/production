import { UserRole } from "features/editableProfileCard/model/consts/const";
import { userActions, userReducer } from "./model/slice/userSlice";
import { UserSchema, User } from "./model/types/user";
import { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserMounted } from "./model/selectors/getUserMounted/getUserMounted";
import { isUserAdmin, isUserManager, getUserRoles } from "./model/selectors/roleSelectors";

export { userReducer, userActions, getUserAuthData, getUserMounted, UserRole, isUserAdmin, isUserManager };
export type { UserSchema, User };
