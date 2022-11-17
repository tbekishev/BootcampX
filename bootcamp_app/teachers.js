const { Pool } = require('pg');

const values = [process.argv[2]];

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`, values)
.then(res => {
  res.rows.forEach(key => {
    console.log(`${key.cohort}: ${key.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));