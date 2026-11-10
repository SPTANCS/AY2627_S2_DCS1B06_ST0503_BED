// --- In-memory data ---
const blocks = [
  { id: 1, blockNumber: '123A', town: 'Tampines', postalCode: '521123' },
  { id: 2, blockNumber: '456B', town: 'Yishun', postalCode: '760456' }
];

const reports = [
  { id: 1, blockId: 1, larvaeCount: 12, reportedAt: '2026-08-01', status: 'open' },
  { id: 2, blockId: 2, larvaeCount: 3, reportedAt: '2026-08-05', status: 'closed' }
];

// Everything this file shares, in one place at the end
export { blocks, reports };