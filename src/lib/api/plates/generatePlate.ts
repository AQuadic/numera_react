// Deprecated: the UI now uses the plate image URL directly as the <img src="..." />
// and does not perform API validation. Keeping a stub here to avoid accidental
// network calls elsewhere.

export const generatePlate = async () => {
  throw new Error(
    "generatePlate is deprecated: use the plate image URL directly instead of calling the API"
  );
};
