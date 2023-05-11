import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

export const path = './database/employee.json';

const default_employee = {
    employee: [
        {
            id: 1,
            name: 'testname',
            lastname: 'testlname',
            tel: '0123456789',
            address: 'bangkok'
        }
    ]
}

if (!existsSync('./database')) mkdirSync('./database');
if (!existsSync(path)) writeFileSync(path, JSON.stringify(default_employee), 'utf-8')

const data = readFileSync(path, 'utf-8');
export const database = JSON.parse(data);