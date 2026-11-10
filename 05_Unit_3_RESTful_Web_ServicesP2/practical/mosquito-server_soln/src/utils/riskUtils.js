/**
 * Maps a larvae count to an HDB mosquito risk level.
 *   >= 10 -> high    (fogging required)
 *   >= 5  -> medium  (follow-up inspection)
 *   else  -> low
 */
const getRiskLevel = (larvaeCount) => {
  if (larvaeCount >= 10) return 'high';
  if (larvaeCount >= 5) return 'medium';
  return 'low';
};

/**
 * Adds a computed riskLevel field without mutating the original report.
 */
const withRiskLevel = (report) => ({
  ...report,
  riskLevel: getRiskLevel(report.larvaeCount)
});

export { getRiskLevel, withRiskLevel };