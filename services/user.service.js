class UserService {
    constructor() {
        this.users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
            { username: 'user3', password: 'password3' }
        ];
    }

    async login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
            return { message: 'Login successful', user };
        } else {
            throw new Error('Invalid username or password');
        }
    }
}

module.exports = new UserService();