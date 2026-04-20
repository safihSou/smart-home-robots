// Product Database
const products = [
    {
        id: 1,
        name: "Aria AI Assistant",
        tagline: "Your Smart Home Companion",
        description: "Aria is an advanced AI assistant that manages your entire smart home ecosystem. Control lights, temperature, security, and entertainment with natural voice commands. Aria learns your preferences and routines to provide personalized assistance throughout your day.",
        price: 299.99,
        category: "assistant",
        image: "images/products/aria-ai.jpg",
        features: [
            "Natural language processing",
            "Smart home device control",
            "Personalized routine automation",
            "Voice recognition for multiple users",
            "Integration with 1000+ smart devices",
            "Privacy-first design with local processing"
        ],
        specs: {
            "Processor": "Neural AI Chip 2.0",
            "Connectivity": "WiFi 6, Bluetooth 5.2, Zigbee",
            "Battery": "Built-in rechargeable, 12hr backup",
            "Dimensions": "15 x 15 x 20 cm"
        },
        colors: ["Pearl White", "Matte Black", "Rose Gold"],
        inStock: true,
        rating: 4.8,
        reviews: 234
    },
    {
        id: 2,
        name: "ChefBot Pro",
        tagline: "Master Chef in Your Kitchen",
        description: "ChefBot Pro is a revolutionary cooking robot that prepares gourmet meals with precision. With its multi-function cooking system, it can chop, stir, sauté, steam, and even plate your food. Access thousands of recipes and customize them to your dietary preferences.",
        price: 1299.99,
        category: "cooking",
        image: "images/products/chefbot.jpg",
        features: [
            "Multi-function cooking system",
            "Recipe database with 10,000+ dishes",
            "Automatic ingredient dispensing",
            "Self-cleaning mechanism",
            "Dietary restriction accommodation",
            "Meal planning and grocery integration"
        ],
        specs: {
            "Cooking Methods": "12 different techniques",
            "Capacity": "Serves 4-6 people",
            "Connectivity": "WiFi, Bluetooth",
            "Dimensions": "60 x 50 x 40 cm"
        },
        colors: ["Stainless Steel", "Matte Black", "Copper"],
        inStock: true,
        rating: 4.9,
        reviews: 156
    },
    {
        id: 3,
        name: "CleanBot Pro",
        tagline: "Effortless Cleaning, Every Day",
        description: "CleanBot Pro uses advanced LiDAR navigation and AI to map your home and clean every corner efficiently. With powerful suction, mopping capability, and automatic dirt disposal, your floors stay spotless without any effort from you.",
        price: 699.99,
        category: "cleaning",
        image: "images/products/cleanbot.jpg",
        features: [
            "LiDAR navigation with room mapping",
            "Vacuum and mop functionality",
            "Automatic dirt disposal (60-day capacity)",
            "Carpet detection and boost",
            "Pet hair removal technology",
            "Zone cleaning and no-go zones"
        ],
        specs: {
            "Suction Power": "4000Pa",
            "Battery Life": "180 minutes",
            "Dust Bin": "500ml",
            "Dimensions": "35 x 35 x 10 cm"
        },
        colors: ["White", "Black", "Navy Blue"],
        inStock: true,
        rating: 4.7,
        reviews: 489
    },
    {
        id: 4,
        name: "OrganizerBot",
        tagline: "Your Personal Schedule Manager",
        description: "OrganizerBot is a compact but powerful assistant that manages your calendar, tasks, and reminders. It syncs with all your devices and uses AI to optimize your schedule, suggest meeting times, and ensure you never miss important events.",
        price: 199.99,
        category: "organizer",
        image: "images/products/organizerbot.jpg",
        features: [
            "Calendar management across platforms",
            "Smart scheduling suggestions",
            "Task prioritization AI",
            "Voice and text input",
            "Meeting transcription",
            "Integration with 50+ productivity apps"
        ],
        specs: {
            "Display": "7-inch touchscreen",
            "Connectivity": "WiFi, Bluetooth",
            "Battery": "Rechargeable, 8hr life",
            "Dimensions": "20 x 15 x 5 cm"
        },
        colors: ["Space Gray", "Silver"],
        inStock: true,
        rating: 4.6,
        reviews: 312
    }
];