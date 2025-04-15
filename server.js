import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const user = [
  { email: "alice123@gamil.com", password: "alice123" },
  { email: "ved123@gamil.com", password: "ved123" },
  { email: "charlie@gmail.com", password: "1234xyz" },
];

app.put("/user", async (req, res) => {
  const Email = user.email;
  const Password = user.password;

  try {
    const updateUser = await user.findById(res.params.id, { Email, Password });
    if (!Email) {
      return res.status(404).json({ message: "email not found" });
    }
    res.status(200).json({ updateUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/user", async (req, res) => {
  try {
    const email = await user.delete({ email });
    if (!email) {
      return res.status(404).json({ message: "Email Not Found" });
    } else {
      return res.status(200).json({ message: "User Succesfully Deleted" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
