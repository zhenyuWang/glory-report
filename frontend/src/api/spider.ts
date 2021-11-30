import request from "@/utils/request";
type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";
const curryRequest = (
  url: string,
  method: Method,
  data?: Record<string, unknown> | any
) => {
  return request(`spider/${url}`, method, data);
};

export function github(data: { url: string }): Promise<any> {
  return curryRequest("spider_github", "post", data);
}
