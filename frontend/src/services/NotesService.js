import httpService from "./http_service";

export function getNotes() {
  return httpService.get('/active');
}

export function updateNote(note) {
  const endpoint = `/${note.id}`;
  return httpService.put(endpoint, note);
}

export function deleteNote(noteId) {
  const endpoint = `/${noteId}`;
  return httpService.delete(endpoint);
}

export function createNote(data) {
  return httpService.post("", data);
}

export function archiveNote(noteId) {
  const endpoint = `/${noteId}/archive`;
  return httpService.put(endpoint);
}

export function unarchiveNote(noteId) {
  const endpoint = `/${noteId}/unarchive`;
  return httpService.put(endpoint);
}

export function getArchivedNotes() {
  return httpService.get('/archived');
}
