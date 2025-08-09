document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      document.getElementById("link").value = tabs[0].url;
    }
  });
});

document.getElementById("sendBtn").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;
  let link = document.getElementById("link").value;
  const status = document.getElementById("status");
  status.textContent = "";

  if (!phoneNumber || !link) {
    status.textContent = "Both fields are required.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, link }),
    });

    const result = await response.json();

    if (response.ok) {
      status.textContent = "✅ Link shared successfully!";
      document.getElementById("phoneNumber").value = "";
      document.getElementById("link").value = "";
    } else {
      status.textContent = `❌ ${result.error || "Failed to send link."}`;
    }
  } catch (error) {
    status.textContent = `❌ Error: ${error.message}`;
  }
});
