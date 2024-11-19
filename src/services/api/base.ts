import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, API_ERRORS } from '@/config/api';
import type { ApiResponse, ApiError } from './types';

/**
 * Base API client configuration
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

/**
 * Type guard to check if the response is valid
 */
function isValidResponse<T>(response: unknown): response is AxiosResponse<T> {
  return response !== null && 
         typeof response === 'object' && 
         'data' in response &&
         response.data !== null &&
         response.data !== undefined;
}

/**
 * Generic API request handler with error handling
 */
export async function handleApiRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const response = await request;

    if (!isValidResponse<T>(response)) {
      throw new Error(API_ERRORS.VALIDATION);
    }

    return { data: response.data };
  } catch (error) {
    let errorMessage = API_ERRORS.DEFAULT;
    let statusCode: number | undefined;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      statusCode = axiosError.response?.status;

      if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
        errorMessage = (axiosError.response.data as { message?: string }).message || 
                      API_ERRORS.SERVER;
      } else if (axiosError.request) {
        errorMessage = API_ERRORS.NETWORK;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const apiError: ApiError = {
      message: errorMessage,
      status: statusCode
    };

    console.error('API Error:', {
      message: apiError.message,
      status: apiError.status,
      url: (error as AxiosError)?.config?.url
    });

    throw apiError;
  }
}