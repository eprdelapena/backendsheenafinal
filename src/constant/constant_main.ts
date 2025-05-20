import { IResponseCode } from "@/types/main_schema";

export enum EParamsDefault {
  IPAddress="http://192.168.254.135"
}

export enum ERequestStatus {
  Success = 200,
  InvalidField = 400,
}

export enum EStatusString {
  success = "success",
}

export enum ESearchTypeProducts {
  category = "category",
  productid = "productid",
  title = "title",
  searchtag = "searchtag",
}

export enum ECategory {
  bags = "bags",
  shoes = "shoes",
}

export const RequestStatusObject: Record<string, IResponseCode> = {
  success: {
    status: 200,
    message: "Success",
  },

  invalidField: {
    status: 400,
    message: "Invalid field",
  },

  invalidFieldSpecialCharacters: {
    status: 401,
    message: "Invalid field - Special Characters",
  },

  invalidFieldPassword: {
    status: 402,
    message: "Invalid field - Password",
  },

  invalidFieldEmail: {
    status: 403,
    message: "Invalid field - Email",
  },

  invalidFieldMobile: {
    status: 404,
    message: "Invalid field - Mobile",
  },

  invalidUserExists: {
    status: 405,
    message: "Invalid User - already exists",
  },

  invalidFieldAccountType: {
    status: 406,
    message: "Invalid field - Account Type",
  },

  invalidAdminRegPass: {
    status: 407,
    message: "Invalid field - Admin Registration Password",
  },

  invalidUserNotFound: {
    status: 408,
    message: "Invalid credentials - User Not Found",
  },

  invalidFirstName: {
    status: 409,
    message: "Invalid First Name",
  },

  invalidLastName: {
    status: 410,
    message: "Invalid Last Name",
  },

  invalidAuthorization: {
    status: 411,
    message: "Invalid authorization",
  },

  invalidProductNotFound: {
    status: 412,
    message: "Invalid Product - Product Not Found",
  },

  invalidProductInsufficient: {
    status: 413,
    message: "Invalid Product - Product Insufficient",
  },
};
