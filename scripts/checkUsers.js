/**
 * Check and Update User Roles Script
 * Usage: node scripts/checkUsers.js [email] [role]
 *
 * Examples:
 *   node scripts/checkUsers.js                    # List all users
 *   node scripts/checkUsers.js user@test.com admin # Set user as admin
 */

require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/aptitude-site";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

const listUsers = async () => {
  try {
    const users = await mongoose.connection.db.collection("users").find({}).toArray();

    console.log("\n📋 Users in database:");
    console.log("────────────────────────────────────────────────────────────");
    console.log(sprintf("%-30s %-20s %-15s", "Email", "Name", "Role"));
    console.log("────────────────────────────────────────────────────────────");

    if (users.length === 0) {
      console.log("No users found!");
    } else {
      users.forEach(u => {
        console.log(sprintf("%-30s %-20s %-15s",
          u.email || "N/A",
          u.name || "N/A",
          u.role || "user"
        ));
      });
    }
    console.log("────────────────────────────────────────────────────────────");
    console.log(`Total users: ${users.length}`);

  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
  }
};

const updateUserRole = async (email, role) => {
  try {
    const result = await mongoose.connection.db.collection("users").updateOne(
      { email: email },
      { $set: { role: role } }
    );

    if (result.matchedCount === 0) {
      console.log(`❌ User with email "${email}" not found!`);
    } else {
      console.log(`✅ User "${email}" role updated to "${role}"`);
    }
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
  }
};

// Simple sprintf-like function for formatting
function sprintf(format, ...args) {
  return format.replace(/%[-+0-9]*\.?[bcdfoxXsu]/g, () => args.shift());
}

// Main execution
const runScript = async () => {
  try {
    await connectDB();

    const args = process.argv.slice(2);

    if (args.length === 0) {
      // List all users
      await listUsers();
    } else if (args.length === 2) {
      // Update user role
      const [email, role] = args;
      await updateUserRole(email, role);
      console.log("\n📋 Updated user list:");
      await listUsers();
    } else {
      console.log("Usage:");
      console.log("  node scripts/checkUsers.js                    # List all users");
      console.log("  node scripts/checkUsers.js <email> <role>      # Set user role");
      console.log("\nExample:");
      console.log("  node scripts/checkUsers.js user@test.com admin");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Script error:", err.message);
    process.exit(1);
  }
};

runScript();
