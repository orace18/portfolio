import 'dotenv/config';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from '../auth/schemas/user.schema';

async function run(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!uri || !email || !password) {
    console.error('MONGODB_URI, ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans backend/.env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  const UserModel = mongoose.model(User.name, UserSchema);

  const passwordHash = await bcrypt.hash(password, 10);
  await UserModel.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { email: email.toLowerCase().trim(), passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Compte admin prêt : ${email}`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
