// success
export const loginSuccess = "Login success"
export const logoutSuccess = "Logged Out"
export const createSuccess = (data: string) => `${data} added successfully`
export const updateSuccess = (data: string) => `${data} updated successfully`
export const sendSuccess = (data: string) => `${data} sent successfully`
export const deleteSuccess = (data: string) => `${data} deleted successfully`

// error
export const errorNotFound = (data: string = "") => `${data} not found`;
export const errorAlreadyExists = (data: string = "") => `${data} already exist`;
export const errorNotSend = (data: string = "") => `${data} is required`;
export const errorNotValid = (data: string = "") => `${data} invalid`;
export const errorMinLength = (data: string = "", length: number) => `${data} must be at least ${length} characters long`;
export const errorMaxLength = (data: string = "", length: number) => `${data} must be less than ${length} characters long`;
export const errorSpesificLength = (data: string = "", length: number) => `${data} must be ${length} characters long`;
export const errorNotSame = (data: string = "", data2: string = "") => `${data} not same as ${data2}`;
export const errorValidation = (error: any) => error.message?.[0]?.message || error.message;
