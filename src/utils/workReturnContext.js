const STORAGE_KEY = "mya-work-return-context";

const safelyRead = () => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveWorkReturnContext = (context, pending = false) => {
  if (!context?.source || !context?.activeProjectId) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ context, pending }));
  } catch {
    // Router state remains available when browser storage is unavailable.
  }
};

export const readWorkReturnContext = (projectId) => {
  const entry = safelyRead();
  if (!entry?.context || entry.context.activeProjectId !== projectId) return null;
  return entry;
};

export const consumePendingWorkReturnContext = () => {
  const entry = safelyRead();
  if (!entry?.pending || !entry.context) return null;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing further is needed if storage cannot be updated.
  }
  return entry.context;
};
