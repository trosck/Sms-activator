export const Equal = (value: String) => {
  switch (value) {
    case "NO_ACTIVATION":
      throw new Error("Activation id does not exist");
    case "BAD_SERVICE":
      throw new Error("Incorrect service name");
    case "BAD_STATUS":
      throw new Error("Incorrect status");
    case "BAD_ACTION":
      throw new Error("Unresolved method");
    case "ERROR_SQL":
      throw new Error("Server internal error");
    case "BAD_KEY":
      throw new Error("Invalid request, possibly the API key is invalid");
    case "STATUS_CANCEL":
      throw new Error("Activation cancel");

    default:
      return;
  }
};
