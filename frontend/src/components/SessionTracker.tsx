import React, { useState, useEffect } from 'react';
import { X, BarChart3 } from 'lucide-react';

interface SessionData {
  session_id: string;
  typing_speed: number;
  scroll_velocity: number;
  mouse_jitter: number;
  hesitation_time: number;
  timestamp: string;
}

interface UserData {
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

const SessionTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData>({
    session_id: `sess_${Date.now()}`,
    typing_speed: 0,
    scroll_velocity: 0,
    mouse_jitter: 0,
    hesitation_time: 0,
    timestamp: new Date().toISOString()
  });

  const [userData, setUserData] = useState<UserData>({
    user_id: `user_${Math.random().toString(36).substr(2, 9)}`,
    device_id: `dev_${Math.random().toString(36).substr(2, 9)}`,
    location: "New York, NY",
    loyalty_points: Math.floor(Math.random() * 5000),
    velocity_score: Math.floor(Math.random() * 100),
    account_age_days: Math.floor(Math.random() * 365),
    behavior_risk: Math.floor(Math.random() * 10),
    action: "page_view",
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    let mouseLastX = 0;
    let mouseLastY = 0;
    let mouseMovements: number[] = [];
    let scrollVelocities: number[] = [];
    let lastScrollTime = Date.now();
    let lastScrollY = window.scrollY;
    let keyPressTimestamps: number[] = [];
    let lastActionTime = Date.now();

    // Track mouse movement for jitter calculation
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = Math.abs(e.clientX - mouseLastX);
      const deltaY = Math.abs(e.clientY - mouseLastY);
      const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (movement > 0) { // Only track actual movement
        mouseMovements.push(movement);
        if (mouseMovements.length > 20) mouseMovements.shift(); // Increased sample size
        
        // Calculate standard deviation for jitter (more accurate than average)
        const avg = mouseMovements.reduce((a, b) => a + b, 0) / mouseMovements.length;
        const variance = mouseMovements.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / mouseMovements.length;
        const jitter = Math.sqrt(variance);
        
        setSessionData(prev => ({ ...prev, mouse_jitter: Math.round(jitter * 100) / 100 }));
      }
      
      mouseLastX = e.clientX;
      mouseLastY = e.clientY;
      
      // Update last action time for hesitation tracking
      lastActionTime = Date.now();
    };

    // Track scroll velocity
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      if (timeDiff > 0 && scrollDiff > 0) {
        const velocity = (scrollDiff / timeDiff) * 1000; // pixels per second
        scrollVelocities.push(velocity);
        if (scrollVelocities.length > 10) scrollVelocities.shift();
        
        const avgVelocity = scrollVelocities.reduce((a, b) => a + b, 0) / scrollVelocities.length;
        setSessionData(prev => ({ ...prev, scroll_velocity: Math.round(avgVelocity) }));
      }
      
      lastScrollTime = currentTime;
      lastScrollY = currentScrollY;
      lastActionTime = currentTime;
    };

    // Track typing speed with real WPM calculation
    const handleKeyPress = (e: KeyboardEvent) => {
      const currentTime = Date.now();
      keyPressTimestamps.push(currentTime);
      
      // Keep only last 10 keystrokes for calculation
      if (keyPressTimestamps.length > 10) {
        keyPressTimestamps.shift();
      }
      
      if (keyPressTimestamps.length >= 5) {
        const timeSpan = keyPressTimestamps[keyPressTimestamps.length - 1] - keyPressTimestamps[0];
        const keystrokes = keyPressTimestamps.length - 1;
        
        if (timeSpan > 0) {
          // Calculate WPM (assuming 5 characters per word)
          const wpm = Math.round((keystrokes / 5) * (60000 / timeSpan));
          setSessionData(prev => ({ 
            ...prev, 
            typing_speed: Math.min(wpm, 120) // Cap at realistic maximum
          }));
        }
      }
      
      lastActionTime = currentTime;
    };

    // Handle clicks for action tracking
    const handleClick = () => {
      lastActionTime = Date.now();
      setUserData(prev => ({ ...prev, action: 'click' }));
    };

    // Update timestamps and hesitation time
    const intervalId = setInterval(() => {
      const now = new Date().toISOString();
      const currentTime = Date.now();
      const hesitationTime = currentTime - lastActionTime;
      
      setSessionData(prev => ({ 
        ...prev, 
        timestamp: now,
        hesitation_time: Math.min(hesitationTime, 30000) // Cap at 30 seconds
      }));
      
      // Update user data less frequently to be more realistic
      if (Math.random() < 0.3) { // 30% chance each interval
        const actions = ['page_view', 'hover', 'search', 'idle'];
        setUserData(prev => ({ 
          ...prev, 
          action: actions[Math.floor(Math.random() * actions.length)],
          timestamp: now
        }));
      }
    }, 1000); // Update every second

    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Toggle Button - positioned above the security chatbot */}
      <div className="fixed bottom-28 right-6 z-50">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 ${
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <BarChart3 className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      {/* Session Data Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <h3 className="font-semibold">Session Analytics</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm opacity-90 mt-1">
              Real-time behavioral tracking
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Session Data */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Session Metrics
              </h4>
              <div className="text-xs space-y-2 bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Session ID:</span>
                  <span className="text-gray-800 font-mono">{sessionData.session_id.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Typing Speed:</span>
                  <span className="text-gray-800">{sessionData.typing_speed} WPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Scroll Velocity:</span>
                  <span className="text-gray-800">{sessionData.scroll_velocity} px/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Mouse Jitter:</span>
                  <span className="text-gray-800">{sessionData.mouse_jitter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Hesitation:</span>
                  <span className="text-gray-800">{(sessionData.hesitation_time / 1000).toFixed(1)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Last Update:</span>
                  <span className="text-gray-800">{sessionData.timestamp.split('T')[1].split('.')[0]}</span>
                </div>
              </div>
            </div>

            {/* User Data */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                User Profile
              </h4>
              <div className="text-xs space-y-2 bg-teal-50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">User ID:</span>
                  <span className="text-gray-800 font-mono">{userData.user_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Device:</span>
                  <span className="text-gray-800 font-mono">{userData.device_id.slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="text-gray-800">{userData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Loyalty Points:</span>
                  <span className="text-gray-800">{userData.loyalty_points.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Velocity Score:</span>
                  <span className="text-gray-800">{userData.velocity_score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Account Age:</span>
                  <span className="text-gray-800">{userData.account_age_days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Risk Level:</span>
                  <span className={`font-medium ${userData.behavior_risk <= 3 ? 'text-green-600' : userData.behavior_risk <= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {userData.behavior_risk}/10
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Current Action:</span>
                  <span className="text-gray-800 capitalize">{userData.action}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Live tracking active</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionTracker;