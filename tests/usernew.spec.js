const { test, expect } = require('@playwright/test');
const mysql = require('mysql2/promise');

test('Connect to MySQL inside Playwright test', async () => {

  let connection;
  try {
    console.log('Kết nối MySQL từ Playwright test...');

    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'logicom_admin',
      password: 'L0giC0mPa$$',
      database: 'SYS_ATHENA_v2',
      charset: 'utf8mb4'
    });

    console.log('Kết nối thành công!');

    const [rows] = await connection.execute(
      `SELECT * 
       FROM m_user
       WHERE DATE(create_date_time) = CURRENT_DATE()
       ORDER BY create_date_time DESC
       LIMIT 1;`
    );

    const latestUserToday = rows.length > 0 ? rows[0] : null;

    if (latestUserToday) {
      console.log('Bản ghi mới nhất hôm nay:', latestUserToday);
    } else {
      console.error('Chưa có bản ghi nào hôm nay trong DB!');
    }

    // Verify email trùng với user vừa tạo
    expect(rows).not.toBeNull();
    expect(rows[0].email).toBe('giahd5@nal.vn');

  } catch (err) {
    console.error('Lỗi MySQL:', err);
  } finally {
    if (connection) await connection.end();
    console.log('Kết nối MySQL đã đóng.');
  }
});
