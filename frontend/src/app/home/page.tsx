"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  class: string;
  topicCount: number;
  downloaded: boolean;
  progress: number;
}

interface ProgressData {
  courses: Record<string, { progress: number; downloaded: boolean }>;
  streak: number;
  lastActiveDate: string;
}

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [streak, setStreak] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Sample courses data
  const sampleCourses: Course[] = [
    {
      id: "math-class-1",
      title: "NCERT Math Class 1",
      description: "Basic mathematics for Class 1 students",
      class: "Class 1",
      topicCount: 13,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-2",
      title: "NCERT Math Class 2",
      description: "Mathematics fundamentals for Class 2",
      class: "Class 2",
      topicCount: 4,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-4",
      title: "NCERT Math Class 4",
      description: "Advanced concepts for Class 4",
      class: "Class 4",
      topicCount: 6,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-5",
      title: "NCERT Math Class 5",
      description: "Comprehensive math curriculum for Class 5",
      class: "Class 5",
      topicCount: 11,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-7",
      title: "NCERT Math Class 7",
      description: "Mathematics for Class 7 students",
      class: "Class 7",
      topicCount: 13,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-8",
      title: "NCERT Math Class 8",
      description: "Advanced mathematics concepts",
      class: "Class 8",
      topicCount: 13,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-9",
      title: "NCERT Math Class 9",
      description: "Foundation for higher mathematics",
      class: "Class 9",
      topicCount: 12,
      downloaded: false,
      progress: 0,
    },
    {
      id: "math-class-11",
      title: "NCERT Math Class 11",
      description: "Higher secondary mathematics",
      class: "Class 11",
      topicCount: 14,
      downloaded: false,
      progress: 0,
    },
  ];

  useEffect(() => {
    // Load progress from localStorage
    const loadProgress = () => {
      try {
        const stored = localStorage.getItem("ruraledu-progress");
        if (stored) {
          const progressData: ProgressData = JSON.parse(stored);
          setStreak(progressData.streak || 0);
          
          // Update courses with progress
          setCourses(
            sampleCourses.map((course) => ({
              ...course,
              downloaded: progressData.courses[course.id]?.downloaded || false,
              progress: progressData.courses[course.id]?.progress || 0,
            }))
          );
        } else {
          setCourses(sampleCourses);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
        setCourses(sampleCourses);
      }
    };

    loadProgress();

    // Check online status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // PWA Install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleDownload = async (courseId: string) => {
    if (!isOnline) {
      alert("Please connect to internet to download courses");
      return;
    }

    // Update course as downloaded
    const updatedCourses = courses.map((course) =>
      course.id === courseId
        ? { ...course, downloaded: true }
        : course
    );
    setCourses(updatedCourses);

    // Save to localStorage
    const stored = localStorage.getItem("ruraledu-progress");
    const progressData: ProgressData = stored
      ? JSON.parse(stored)
      : { courses: {}, streak: 0, lastActiveDate: "" };

    progressData.courses[courseId] = {
      ...progressData.courses[courseId],
      downloaded: true,
      progress: progressData.courses[courseId]?.progress || 0,
    };

    localStorage.setItem("ruraledu-progress", JSON.stringify(progressData));

    // In a real app, this would download course content to IndexedDB
    alert(`Course "${courses.find((c) => c.id === courseId)?.title}" downloaded! Available offline.`);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("ruraledu-progress");
    const progressData: ProgressData = stored
      ? JSON.parse(stored)
      : { courses: {}, streak: 0, lastActiveDate: "" };

    if (progressData.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (progressData.lastActiveDate === yesterdayStr) {
        progressData.streak += 1;
      } else if (progressData.lastActiveDate !== today) {
        progressData.streak = 1;
      }

      progressData.lastActiveDate = today;
      localStorage.setItem("ruraledu-progress", JSON.stringify(progressData));
      setStreak(progressData.streak);
    }
  };

  useEffect(() => {
    updateStreak();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <svg width={30} height={30} viewBox="0 0 32 32" aria-hidden className="mr-2">
            <path d="M16 6L3 12l13 6 11.86-5.48a1 1 0 0 0 0-1.8L16 6z" fill="#18659e"/>
            <ellipse cx="16" cy="24" rx="10" ry="4.5" fill="#eee"/>
          </svg>
          <span className="text-xl font-bold text-[#153b52]">RuralEdu</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#18659e]">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <div className="text-sm text-[#18659e]">
            🔥 {streak} day streak
          </div>
        </div>
      </header>

      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-[#153b52] font-medium">
              Install RuralEdu for offline access
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Works offline • Faster loading • Better experience
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-4 py-1.5 bg-[#18659e] text-white text-sm rounded hover:bg-[#153b52] transition"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="px-4 py-1.5 text-gray-600 text-sm hover:text-gray-800"
            >
              Later
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Progress Summary */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h2 className="text-lg font-semibold text-[#153b52] mb-2">Your Progress</h2>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-600">Courses Downloaded: </span>
              <span className="font-semibold text-[#18659e]">
                {courses.filter((c) => c.downloaded).length} / {courses.length}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Day Streak: </span>
              <span className="font-semibold text-[#18659e]">{streak} days</span>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#153b52]">My Courses</h1>
          <Link
            href="/"
            className="text-sm text-[#18659e] hover:underline"
          >
            Back to Home
          </Link>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#153b52] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{course.topicCount} topics</span>
                    {course.downloaded && (
                      <span className="flex items-center gap-1 text-green-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Downloaded
                      </span>
                    )}
                    {course.progress > 0 && (
                      <span>Progress: {course.progress}%</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!course.downloaded && (
                    <button
                      onClick={() => handleDownload(course.id)}
                      disabled={!isOnline}
                      className="px-4 py-2 bg-[#18659e] text-white text-sm rounded hover:bg-[#153b52] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                    >
                      {isOnline ? "Download" : "Offline"}
                    </button>
                  )}
                  <Link
                    href={`/course/${course.id}`}
                    className="px-4 py-2 bg-[#eaf3fa] text-[#18659e] text-sm rounded hover:bg-[#18659e] hover:text-white transition"
                  >
                    {course.downloaded ? "Start" : "View"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Button */}
        <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#18659e] transition">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
              <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
            </svg>
            <span className="text-sm font-medium">Add another course</span>
          </button>
        </div>
      </main>
    </div>
  );
}
