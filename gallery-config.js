// ============================================
// INFINITE MUSEUM - GALLERY CONFIGURATION
// ============================================
// Edit this file to add your projects with real photos!
// Place your images in the "images/projects/" folder

window.GALLERY_CONFIG = {
    // Museum Title
    title: "🎨 My Creative Gallery",
    
    // Subtitle
    subtitle: "Interactive 3D Portfolio | Click any artwork to explore",
    
    // Your Artworks Collection
    artworks: [
        {
            id: 1,
            name: "🌊 Ocean Sunset",
            description: "A breathtaking view of the Pacific coast during golden hour. Captured with Sony A7III.",
            imageUrl: "images/projects/ocean-sunset.jpg",  // ← Your photo here!
            techStack: ["Photography", "Sony A7III", "Lightroom"],
            category: "Photography",
            date: "March 2024",
            demoUrl: "https://yourportfolio.com/ocean-sunset",
            infoUrl: "https://instagram.com/p/yourpost",
            position: { x: 0, y: 0 }
        },
        
        {
            id: 2,
            name: "🏙️ City Lights",
            description: "Long exposure shot of downtown at night. 30 second exposure, f/8, ISO 100.",
            imageUrl: "images/projects/city-lights.jpg",  // ← Your photo here!
            techStack: ["Night Photography", "Tripod", "Lightroom"],
            category: "Urban",
            date: "February 2024",
            demoUrl: "https://yourportfolio.com/city-lights",
            infoUrl: "https://flickr.com/yourphoto",
            position: { x: 2, y: 1 }
        },
        
        {
            id: 3,
            name: "✨ Nebula Dreams",
            description: "Digital artwork created with generative AI and Photoshop post-processing.",
            imageUrl: "images/projects/nebula-art.jpg",  // ← Your artwork here!
            techStack: ["Generative Art", "Photoshop", "After Effects"],
            category: "Digital Art",
            date: "January 2024",
            demoUrl: "https://yourportfolio.com/nebula",
            infoUrl: "https://artstation.com/yourwork",
            position: { x: -1, y: -2 }
        },
        
        // ADD MORE PROJECTS HERE!
        // Just copy the block above and update the details
        {
            id: 4,
            name: "🤖 AI Explorer",
            description: "Interactive machine learning visualization tool built with TensorFlow.js",
            imageUrl: "images/projects/ai-explorer.png",
            techStack: ["TensorFlow.js", "React", "Three.js"],
            category: "Web Dev",
            date: "December 2023",
            demoUrl: "https://yourdemo.com/ai-explorer",
            infoUrl: "https://github.com/yourusername/ai-explorer",
            position: { x: 3, y: -1 }
        }
    ]
};
