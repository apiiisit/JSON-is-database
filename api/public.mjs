import { Router } from 'express';
import { database, path } from '../controller.mjs';
import { writeFileSync } from 'node:fs';
const publicapi = Router();

const employee = database.employee;

publicapi.get('/info', (req, res) => {
    return res.json({ error: false, data: [...employee] });
});

// {
//     "name": "name",
//     "lastname": "lname",
//     "tel": "0123456789",
//     "address": "bangkok"
// }
publicapi.post('/add', (req, res) => {
    const data = req.body;
    data.id = Math.floor(Math.random(0) * 1000);

    const emp = [...employee];
    emp.push(data);

    database.employee = emp;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'เพิ่มเรียบร้อย' });
});

// {
//     "id": 2,
//     "name": "name",
//     "lastname": "lname",
//     "tel": "0123456789",
//     "address": "bangkok"
// }
publicapi.put('/update', (req, res) => {
    const data = req.body;
    const emp = [...employee];

    const index = emp.findIndex(e => e.id == data.id);
    if (index === -1) return res.status(500).json({ error: true, data: 'ไม่พบข้อมูล' });
    emp[index] = data;

    database.employee = emp;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'แก้ไขเรียบร้อย' });
});

// {
//     "id": 2
// }
publicapi.delete('/delete', (req, res) => {
    const id = req.body.id;
    const emp = [...employee];

    const index = emp.findIndex(e => e.id == id);
    if (index === -1) return res.status(500).json({ error: true, data: 'ไม่พบข้อมูล' });
    emp.splice(index, 1);

    database.employee = emp;
    writeFileSync(path, JSON.stringify(database), 'utf-8');
    return res.json({ error: false, data: 'ลบเรียบร้อย' });
});

export default publicapi;