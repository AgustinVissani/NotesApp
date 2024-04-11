import httpService from "./http_service";

export function getCategories() {
  return httpService.get('/categories');
}

export function updateCategory(category) {
  const endpoint = `/categories/${category.id}`;
  return httpService.put(endpoint, category);
}

export function deleteCategory(categoryId) {
  const endpoint = `/categories/${categoryId}`;
  return httpService.delete(endpoint);
}

export function createCategory(data) {
  return httpService.post("/categories", data);
}
