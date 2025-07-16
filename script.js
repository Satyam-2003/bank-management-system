class BankUser {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.balance = 0;
    this.isAuthenticated = false;
    this.transactionHistory = [];
  }

  login(name, password) {
    if (this.name === name && this.password === password) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  deposit(amount) {
    if (amount <= 0) return "❌ Invalid amount!";
    this.balance += amount;
    this.transactionHistory.push(`Deposited ₹${amount}`);
    return `💰 Deposited ₹${amount}`;
  }

  withdraw(amount) {
    if (amount > this.balance) return "❌ Not enough balance!";
    this.balance -= amount;
    this.transactionHistory.push(`Withdrew ₹${amount}`);
    return `💸 Withdrawn ₹${amount}`;
  }

  showBalance() {
    return `📊 Balance: ₹${this.balance}`;
  }

  changePassword(oldPass, newPass) {
    if (oldPass !== this.password) return "❌ Incorrect current password!";
    this.password = newPass;
    return "✅ Password updated!";
  }

  logout() {
    this.isAuthenticated = false;
  }

  showTransactions() {
    if (this.transactionHistory.length === 0) return "📝 No transactions yet.";
    return this.transactionHistory.map((t, i) => `${i + 1}. ${t}`).join("\n");
  }
}

const users = [];
let currentUser = null;

function getInput(id) {
  return document.getElementById(id).value;
}

function setOutput(msg) {
  document.getElementById("output").textContent = msg;
}

function createAccount() {
  const name = getInput("name");
  const pass = getInput("password");
  if (!name || !pass) return setOutput("❌ Please fill all fields.");
  users.push(new BankUser(name, pass));
  setOutput("✅ Account created!");
}

function login() {
  const name = getInput("name");
  const pass = getInput("password");
  const user = users.find((u) => u.login(name, pass));
  if (user) {
    currentUser = user;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("bank-section").style.display = "block";
    document.getElementById("welcome").textContent = `Welcome, ${user.name}`;
    setOutput("✅ Logged in successfully!");
  } else {
    setOutput("❌ Invalid credentials!");
  }
}

function logout() {
  currentUser.logout();
  currentUser = null;
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("bank-section").style.display = "none";
  setOutput("🔓 Logged out.");
}

function deposit() {
  if (!currentUser) {
    setOutput("🔒 Please login first.");
    return;
  }
  const amt = parseInt(getInput("amount"));
  setOutput(currentUser.deposit(amt));
}

function withdraw() {
  if (!currentUser) {
    setOutput("🔒 Please login first.");
    return;
  }
  const amt = parseInt(getInput("amount"));
  setOutput(currentUser.withdraw(amt));
}

function showBalance() {
  if (!currentUser) {
    setOutput("🔒 Please login first.");
    return;
  }
  setOutput(currentUser.showBalance());
}

function showTransactions() {
  setOutput(currentUser.showTransactions());
}

function changePassword() {
  const oldP = getInput("oldPass");
  const newP = getInput("newPass");
  setOutput(currentUser.changePassword(oldP, newP));
}
