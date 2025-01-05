export default function useLocalStorageHandler() {
  const removeExpressions = () => {
    if (confirm('Are you sure you want to remove all expressions?')) {
      localStorage.clear();
      location.reload();
    }
  };

  return [removeExpressions] as const;
}
