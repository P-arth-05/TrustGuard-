// src/utils/api.ts
export const callLoyaltyAction = async (
  token: string,
  payload: {
    user_id: string;
    device_id: string;
    location: string;
    loyalty_points: number;
    velocity_score: number;
    account_age_days: number;
    behavior_risk: number;
    action: string;
    timestamp: string;
  }
) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loyalty`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Loyalty action API error');
  }

  return res.json();
};

export const callBehaviorEvent = async (
  token: string,
  payload: {
    session_id: string;
    typing_speed: number;
    scroll_velocity: number;
    mouse_jitter: number;
    hesitation_time: number;
    timestamp: string;
  }
) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/behavior`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Behavior event API error');
  }

  return res.json();
};
