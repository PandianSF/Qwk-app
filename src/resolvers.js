const jwt = require('jsonwebtoken');
const SECRET = 'mysecretkey';

const resolvers = {
    Query: {
      async login(parent, { email, password }, { prisma }) {
        const user = await prisma.user.findUnique({ where: { email } });
  
        if (!user) {
          throw new Error('Invalid login credentials');
        }
  
        const validPassword = await bcrypt.compare(password, user.password);
  
        if (!validPassword) {
          throw new Error('Invalid login credentials');
        }
  
        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '7d' });
  
        // Log successful login attempt and store session token in database
        await prisma.sessionLog.create({
          data: {
            user: { connect: { id: user.id } },
            token,
            success: true,
          },
        });
  
        return token;
      },
    },
}
 module.exports = {
    resolvers
}
