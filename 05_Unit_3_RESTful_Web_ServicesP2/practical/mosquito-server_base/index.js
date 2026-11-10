import express from 'express';

const app = express();
app.use(express.json());

// --- In-memory data ---
const blocks = [
  { id: 1, blockNumber: '123A', town: 'Tampines', postalCode: '521123' },
  { id: 2, blockNumber: '456B', town: 'Yishun', postalCode: '760456' }
];

const reports = [
  { id: 1, blockId: 1, larvaeCount: 12, reportedAt: '2026-08-01', status: 'open' },
  { id: 2, blockId: 2, larvaeCount: 3, reportedAt: '2026-08-05', status: 'closed' }
];

// --- Report endpoints ---
app.get('/api/reports', (req, res) => {
  res.status(200).json(reports);
});

app.get('/api/reports/:id', (req, res) => {
  const report = reports.find((r) => r.id === Number(req.params.id));
  if (!report) {
    return res.status(404).json({ message: 'Report not found' });
  }
  res.status(200).json(report);
});

app.post('/api/reports', (req, res) => {
  const { blockId, larvaeCount } = req.body;
  if (!blockId || larvaeCount === undefined) {
    return res.status(400).json({ message: 'blockId and larvaeCount are required' });
  }
  const newReport = {
    id: reports.length + 1,
    blockId,
    larvaeCount,
    reportedAt: new Date().toISOString().slice(0, 10),
    status: 'open'
  };
  reports.push(newReport);
  res.status(201).json(newReport);
});

// --- Block endpoints ---
app.get('/api/blocks', (req, res) => {
  res.status(200).json(blocks);
});

app.get('/api/blocks/:id', (req, res) => {
  const block = blocks.find((b) => b.id === Number(req.params.id));
  if (!block) {
    return res.status(404).json({ message: 'Block not found' });
  }
  res.status(200).json(block);
});

app.listen(3000, () => {
  console.log('Mosquito server running on port 3000');
});
