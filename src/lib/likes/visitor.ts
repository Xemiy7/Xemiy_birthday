const VISITOR_KEY = "xemiy-visitor-id";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}
