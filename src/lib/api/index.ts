export { signUp, login, getCurrentUser, logout, getErrorMessage } from "./auth";
export type {
  User,
  AuthResponse,
  UserResponse,
  ApiError,
  SignUpRequest,
  LoginRequest,
} from "./auth";

export { createSuggestion } from "./suggestions";
export type { SuggestionRequest, SuggestionResponse } from "./suggestions";

export { getPlates, getCities, getPlateById } from "./plates";
export type { Plate, PlateFilters, City, PaginatedResponse } from "./plates";

export { getSims, getSimById } from "./sims";
export type { Sim, SimFilters, Operator } from "./sims";
