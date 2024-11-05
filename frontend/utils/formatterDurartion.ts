function formatDuration(durationMilliseconds: number) {
  const totalSeconds = Math.floor(durationMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export { formatDuration };
