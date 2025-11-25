const { test } = require('@playwright/test');
const mysql = require('mysql2/promise');

test('Connect to MySQL inside Playwright test', async () => {
  let connection;

  try {
    console.log('Kết nối MySQL từ Playwright test...');

    connection = await mysql.createConnection({
      host: 'localhost',       // host MySQL
      port: 3306,              // port MySQL
      user: 'logicom_admin',
      password: 'L0giC0mPa$$', // password MySQL
      database: 'SYS_ATHENA_v2',
      charset: 'utf8mb4'
    });
    
    console.log('Kết nối thành công!');

    const [rows] = await connection.execute('SELECT * FROM m_warehouse LIMIT 5;');
    console.log('Dữ liệu trả về:', rows);
    // Insert DB
    const insertQuery = `
  INSERT INTO SYS_ATHENA_v2.m_warehouse (
    system_user_code, logistics_company_code, warehouse_group_code, warehouse_code,
    warehouse_name, warehouse_name_short, office_code, office_name, accounting_code,
    zip_code, address1, address2, country_no, phone_no, company_name,
    person_department_name, person_post_name, person_name, city_code,
    seal_information1, seal_information2, seal_information3, remarks,
    create_user_record_id, create_date_time, update_user_record_id, update_date_time,
    f_delete, fax_no
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  'LOGICOM', 'L001', '100', '10005', '福島北物流センター', '福島北DC', '20', '福島', '53',
  '9691652', '住所１-2', '住所２-2', '81', '3483-2', '1001-2', '', '', '担当者氏名-2', '07301',
  'logicom_square_seal.png', '', '', '', 100000717, '2025-11-03 09:26:54', 100000717,
  '2025-11-03 09:26:53', 0, ''
];

const [insertDb] = await connection.execute(insertQuery, values);
console.log('Đã insert:',insertDb);

  const [UpdateDB] = await connection.execute('UPDATE SYS_ATHENA_v2.m_warehouse SET f_delete = 1 WHERE warehouse_group_code = 100;');
  console.log('Đã update thành công:',UpdateDB)

  } catch (err) {
    console.error('Lỗi kết nối MySQL trong Playwright test');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    console.error('Full error object:', err);   
  } finally {
    if (connection) {
      await connection.end();
      console.log('Kết nối đã đóng.');
    }
  }
});
