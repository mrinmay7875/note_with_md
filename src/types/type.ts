export interface Note {
  id: string;
  title: string;
  body: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Tag {
  id: string;
  name: string;
}
