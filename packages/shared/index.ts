// Shared types and utilities for DevCollab
// This package will contain shared TypeScript interfaces, types, and utility functions
// that can be used across both the web and api applications.

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeId?: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  channelId: string;
  createdAt: Date;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type Timestamped<T> = T & { createdAt: Date; updatedAt: Date };

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}