document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const statusDiv = document.getElementById("signupStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    statusDiv.textContent = "";
    statusDiv.className = "";

    if (!email || !password) {
      statusDiv.textContent = "❌ Please fill in all fields.";
      statusDiv.classList.add("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        statusDiv.textContent =
          "✅ Signup successful! Please check your email to confirm.";
        statusDiv.classList.add("success");
        form.reset();

        // Optionally redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 2000);
      } else {
        statusDiv.textContent = `❌ ${result.error || "Signup failed"}`;
        statusDiv.classList.add("error");
      }
    } catch (err) {
      console.error("Signup error:", err);
      statusDiv.textContent = `❌ Error: ${err.message}`;
      statusDiv.classList.add("error");
    }
  });
});
