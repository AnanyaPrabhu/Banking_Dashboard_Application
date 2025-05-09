// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;
// const FILE_PATH = './deposits.json';

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Ensure JSON file exists
// if (!fs.existsSync(FILE_PATH)) {
//   fs.writeFileSync(FILE_PATH, JSON.stringify([]));
// }

// // Base route (optional but useful for browser check)
// app.get('/', (req, res) => {
//   res.send('<h2>RD/FD Deposit API is running</h2><p>Use POST or GET /rd to interact with the API.</p>');
// });

// // Save RD or FD data
// app.post('/deposits', (req, res) => {
//   try {
//     const newDeposit = req.body;
//     const data = JSON.parse(fs.readFileSync(FILE_PATH));
//     data.push(newDeposit);
//     fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
//     res.status(201).send({ message: 'Deposit saved successfully!' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to save deposit' });
//   }
// });

// // Get all RD and FD data
// app.get('/deposits', (req, res) => {
//   try {
//     const data = JSON.parse(fs.readFileSync(FILE_PATH));
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to read deposits file' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(` Server running at http://localhost:${PORT}`);
// });

















// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = 3000;
// const FILE_PATH = './deposits.json';

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// //Serve Angular frontend from correct path
// app.use(express.static(path.join(__dirname, 'dist/my-app')));

// // Ensure JSON file exists
// if (!fs.existsSync(FILE_PATH)) {
//   fs.writeFileSync(FILE_PATH, JSON.stringify([]));
// }

// // API routes
// app.post('/deposits', (req, res) => {
//   try {
//     const newDeposit = req.body;
//     const data = JSON.parse(fs.readFileSync(FILE_PATH));
//     data.push(newDeposit);
//     fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
//     res.status(201).send({ message: 'Deposit saved successfully!' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to save deposit' });
//   }
// });

// app.get('/deposits', (req, res) => {
//   try {
//     const data = JSON.parse(fs.readFileSync(FILE_PATH));
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to read deposits file' });
//   }
// });

// // Fallback to Angular's index.html for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
