// ------------------------
// Handle Shared Content (via POST Web Share Target)
// ------------------------
window.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname === '/share') {
    try {
      const formData = await navigator.clipboard.readText(); // fallback if browser doesn't support `formData` in POST
      const urlParams = new URLSearchParams(window.location.search);

      const title = urlParams.get('title');
      const text = urlParams.get('text');
      const url = urlParams.get('url');

      // Prefer POST (if available), fallback to GET query params
      const sharedLink = url || text || title;
      if (sharedLink) {
        document.getElementById('linkInput').value = sharedLink;
      }
    } catch (err) {
      console.log('No shared data received or unsupported browser.');
    }
  }
});

// ------------------------
// Paste Button
// ------------------------
document.getElementById('pasteBtn').addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('linkInput').value = text;
  } catch (err) {
    alert('Failed to paste. Please ensure clipboard access is allowed.');
  }
});

// ------------------------
// Send Button
// ------------------------
document.getElementById('sendBtn').addEventListener('click', () => {
  const link = document.getElementById('linkInput').value;
  if (link) {
    alert(`Link sent: ${link}`); // Replace with actual API call
  } else {
    alert('Please paste a link first');
  }
});

// ------------------------
// File Drop Zone
// ------------------------
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.mp4,.mov,.jpg,.png';
  input.onchange = () => {
    if (input.files.length) {
      alert(`File ready: ${input.files[0].name}`);
    }
  };
  input.click();
});

// Drag and drop handlers
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName =>
  dropZone.addEventListener(eventName, preventDefaults, false)
);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName =>
  dropZone.addEventListener(eventName, () => highlight(dropZone), false)
);

['dragleave', 'drop'].forEach(eventName =>
  dropZone.addEventListener(eventName, () => unhighlight(dropZone), false)
);

function highlight(zone) {
  zone.style.borderColor = '#ff3a3a';
}

function unhighlight(zone) {
  zone.style.borderColor = '#444';
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length) {
    alert(`File ready: ${files[0].name}`);
  }
}
