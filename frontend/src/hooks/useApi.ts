// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useApi = () => {
  const { token, refreshToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = useCallback(async <T>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    
    const { method = 'GET', body, headers = {} } = options;
    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    if (!baseUrl) {
      setLoading(false);
      return {
        data: null,
        error: 'Backend URL not configured',
        loading: false,
      };
    }

    if (!token) {
      setLoading(false);
      return {
        data: null,
        error: 'Authentication required',
        loading: false,
      };
    }

    const makeApiCall = async (authToken: string): Promise<ApiResponse<T>> => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token might be expired, try to refresh
            const newToken = await refreshToken();
            if (newToken) {
              // Retry with new token
              return makeApiCall(newToken);
            }
            throw new Error('Authentication failed');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
          data,
          error: null,
          loading: false,
        };
      } catch (error) {
        return {
          data: null,
          error: error instanceof Error ? error.message : 'An unknown error occurred',
          loading: false,
        };
      }
    };

    const result = await makeApiCall(token);
    setLoading(false);
    return result;
  }, [token, refreshToken]);

  return {
    makeRequest,
    loading,
  };
};

// Specific hooks for common operations
export const useUserActions = () => {
  const { makeRequest } = useApi();

  const performUserAction = useCallback(async (
    userId: number,
    action: string,
    user: any
  ) => {
    return makeRequest<{ message: string }>('/loyalty-action', {
      method: 'POST',
      body: {
        user_id: userId.toString(),
        device_id: 'AdminPanel',
        location: 'AdminView',
        loyalty_points: user.loyaltyPoints,
        velocity_score: 1.5,
        account_age_days: parseInt(user.accountAge?.replace(/\D/g, '')) || 0,
        behavior_risk: user.riskScore / 100,
        action,
        timestamp: new Date().toISOString(),
      },
    });
  }, [makeRequest]);

  const getUsers = useCallback(async () => {
    return makeRequest<{ users: any[] }>('/get-users');
  }, [makeRequest]);

  return {
    performUserAction,
    getUsers,
  };
};