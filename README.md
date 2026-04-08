# Blink22 Blog API - Week 1

This is a RESTful API built for the full stack learning track at Blink22.
Serves as the foundation for the blog's backend, and it features strict type safety, request validation, and error handling.

# Technologies used:
Node.js for runtime
Express.js
Typescript
Zod for validation
PostgreSQL for DB
Prisma ORM
Security: JWT, Bcrypt, Helmet, Express-rate-limit
# Key Features: 
* Modular Routing organization
* Global error handling middleware
* Secure JWT Authentication
* Strict Zod Validation
* Database with PostgreSQL using Prisma ORM
* Security measures like `Helmet` for secure HTTP headers, `Bcrypt` for password hashing, `Express-rate-limit` to prevent brute-force and DDOS attacks

# Setup

1. Clone repo
\`\`\`bash
git clone https://github.com/MohabG2/blink-blog.git
cd blog-app
\`\`\`
2. Install dependencies
\`\`\`bash
npm install
\`\`\`
3. Create .env file like .env.example and set DB
4. Run migrations
\`\`\`bash
npx prisma migrate dev
\`\`\`
5. Run development server
\`\`\`bash
npm run dev
\`\`\`

Server runs on http://localhost:3000