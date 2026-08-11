export type AdminActionState = {
  status: "idle" | "error";
  message: string;
};

export const initialAdminActionState: AdminActionState = {
  status: "idle",
  message: "",
};

export type AdminFormAction = (
  state: AdminActionState,
  formData: FormData,
) => Promise<AdminActionState>;
