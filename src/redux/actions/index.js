export const toggleCategory = (id) => ({
  type: "TOGGLE",
  id,
});

export const selectingCategory = (selectedCategory) => ({
  type: "SELECT",
  selectedCategory,
});

export const initCategory = () => ({
  type: "GO_BACK",
});
