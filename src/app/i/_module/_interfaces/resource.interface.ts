export interface IResource {
  id: string,
  text: string,
  url: string,
  type: string,
  createdAt: string,
  updatedAt: string,
}

export interface IResourceUpload {
  text: string,
  type: string,
  url: string,
}