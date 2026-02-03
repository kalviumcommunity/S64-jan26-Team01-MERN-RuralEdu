// IndexedDB utility for offline course storage
const DB_NAME = "RuralEduDB";
const DB_VERSION = 1;
const STORE_COURSES = "courses";
const STORE_LESSONS = "lessons";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  content: any;
  downloadedAt: number;
}

export interface LessonData {
  courseId: string;
  lessonId: string;
  content: any;
}

let db: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // Create courses store
      if (!database.objectStoreNames.contains(STORE_COURSES)) {
        const courseStore = database.createObjectStore(STORE_COURSES, {
          keyPath: "id",
        });
        courseStore.createIndex("title", "title", { unique: false });
      }

      // Create lessons store
      if (!database.objectStoreNames.contains(STORE_LESSONS)) {
        const lessonStore = database.createObjectStore(STORE_LESSONS, {
          keyPath: ["courseId", "lessonId"],
        });
        lessonStore.createIndex("courseId", "courseId", { unique: false });
      }
    };
  });
}

export async function saveCourse(course: CourseData): Promise<void> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_COURSES], "readwrite");
    const store = transaction.objectStore(STORE_COURSES);
    const request = store.put({
      ...course,
      downloadedAt: Date.now(),
    });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCourse(courseId: string): Promise<CourseData | null> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_COURSES], "readonly");
    const store = transaction.objectStore(STORE_COURSES);
    const request = store.get(courseId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllCourses(): Promise<CourseData[]> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_COURSES], "readonly");
    const store = transaction.objectStore(STORE_COURSES);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteCourse(courseId: string): Promise<void> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_COURSES], "readwrite");
    const store = transaction.objectStore(STORE_COURSES);
    const request = store.delete(courseId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveLesson(lesson: LessonData): Promise<void> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_LESSONS], "readwrite");
    const store = transaction.objectStore(STORE_LESSONS);
    const request = store.put(lesson);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getLesson(
  courseId: string,
  lessonId: string
): Promise<LessonData | null> {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_LESSONS], "readonly");
    const store = transaction.objectStore(STORE_LESSONS);
    const request = store.get([courseId, lessonId]);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}
