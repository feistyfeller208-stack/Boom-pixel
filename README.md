# 🎨 Infinite Museum - Your 3D Art Gallery

An interactive, infinite-scrolling 3D museum to showcase your projects with real photos!

## 🚀 How to Add Your Artwork

### Step 1: Add Your Images
1. Create a folder: `images/projects/`
2. Upload your photos/artwork there
3. Supported formats: JPG, PNG, GIF, WebP

### Step 2: Edit `gallery-config.js`
Add a new entry for each project:

```javascript
{
    id: 5,  // Unique number
    name: "My Awesome Project",
    description: "What makes this project special?",
    imageUrl: "images/projects/my-image.jpg",
    techStack: ["React", "Three.js", "WebGL"],
    category: "Web Development",
    date: "March 2024",
    demoUrl: "https://live-demo.com",
    infoUrl: "https://github.com/your-repo"
}
