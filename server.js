const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 사용자 정보 목록 (아이디, 비밀번호, 역할)
const users = {
    'user1': { password: 'pass1', role: 'A' },
    'user2': { password: 'pass2', role: 'B' },
    'user3': { password: 'pass3', role: 'C' },
    'user4': { password: 'pass4', role: 'D' }
};

// 역할에 따른 URL 매핑
const roleToUrl = {
    'A': 'https://sepia-slip-ca2.notion.site/2026-94053f8010614aa28ca09517961032af?pvs=4',
    'B': 'https://example.com/B',
    'C': 'https://example.com/C',
    'D': 'https://example.com/D'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username].password === password) {
        const userRole = users[username].role;
        const redirectUrl = roleToUrl[userRole];
        res.status(200).json({ message: 'Login successful', redirectUrl });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
