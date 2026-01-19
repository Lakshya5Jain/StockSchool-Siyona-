const PROGRESS_STORAGE_PREFIX = "progress_";

export interface UserProgress {
  completedLessons: string[]; // Array of lesson IDs
  completedLevels: number[]; // Array of level numbers
}

export function saveProgress(userId: string, progress: UserProgress) {
  if (!userId) return;
  const key = `${PROGRESS_STORAGE_PREFIX}${userId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

export function loadProgress(userId: string): UserProgress {
  if (!userId) {
    return { completedLessons: [], completedLevels: [] };
  }
  const key = `${PROGRESS_STORAGE_PREFIX}${userId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error loading progress:", e);
      return { completedLessons: [], completedLevels: [] };
    }
  }
  return { completedLessons: [], completedLevels: [] };
}

export function markLessonComplete(userId: string, lessonId: string) {
  if (!userId || !lessonId) return;
  const progress = loadProgress(userId);
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(userId, progress);
  }
}

export function markLevelComplete(userId: string, level: number) {
  if (!userId || !level) return;
  const progress = loadProgress(userId);
  if (!progress.completedLevels.includes(level)) {
    progress.completedLevels.push(level);
    saveProgress(userId, progress);
  }
}

export function isLessonComplete(userId: string, lessonId: string): boolean {
  if (!userId || !lessonId) return false;
  const progress = loadProgress(userId);
  return progress.completedLessons.includes(lessonId);
}

export function isLevelComplete(userId: string, level: number): boolean {
  if (!userId || !level) return false;
  const progress = loadProgress(userId);
  return progress.completedLevels.includes(level);
}
