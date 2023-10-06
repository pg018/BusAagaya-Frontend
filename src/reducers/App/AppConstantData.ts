import { IncomingUserData, UserType } from "../../types/App/AppTypes";
import { ValidationError } from "../../types/apiTypes";

export const initialUserData: IncomingUserData = {
  id: "-1",
  displayName: "",
  emailId: "",
  mobileNumber: -1,
  dateOfBirth: new Date(),
  dateOfJoining: new Date(),
  type: UserType.user,
};

export const initialValidationError: ValidationError = {
  statusCode: 100,
  errorMessage: "",
};
