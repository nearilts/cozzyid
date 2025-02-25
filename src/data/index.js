import { COLORS, icons, images } from "../constants";

export const friends = [
    {
        id: "1",
        name: "Tynisa Obey",
        phoneNumber: "+1-300-400-0135",
        avatar: images.user1,
    },
    {
        id: "2",
        name: "Florencio Dorance",
        phoneNumber: "+1-309-900-0135",
        avatar: images.user2,
    },
    {
        id: "3",
        name: "Chantal Shelburne",
        phoneNumber: "+1-400-100-1009",
        avatar: images.user3,
    },
    {
        id: "4",
        name: "Maryland Winkles",
        phoneNumber: "+1-970-200-4550",
        avatar: images.user4,
    },
    {
        id: "5",
        name: "Rodolfo Goode",
        phoneNumber: "+1-100-200-9800",
        avatar: images.user5,
    },
    {
        id: "6",
        name: "Benny Spanbauer",
        phoneNumber: "+1-780-200-9800",
        avatar: images.user6,
    },
    {
        id: "7",
        name: "Tyra Dillon",
        phoneNumber: "+1-943-230-9899",
        avatar: images.user7,
    },
    {
        id: "8",
        name: "Jamel Eusobio",
        phoneNumber: "+1-900-234-9899",
        avatar: images.user8,
    },
    {
        id: "9",
        name: "Pedro Haurad",
        phoneNumber: "+1-240-234-9899",
        avatar: images.user9
    },
    {
        id: "10",
        name: "Clinton Mcclure",
        phoneNumber: "+1-500-234-4555",
        avatar: images.user10
    },
];


export const faqKeywords = [
    {
        id: "1",
        name: "General"
    },
    {
        id: "2",
        name: "Account"
    },
    {
        id: "3",
        name: "Security"
    },
    {
        id: "4",
        name: "Booking"
    },
    {
        id: "5",
        name: "Payment"
    }
];

export const faqs = [
    {
        question: 'How do I search for hotels on the app?',
        answer: 'To search for hotels, simply enter your destination, check-in and check-out dates, and the number of guests. Then browse through the available options.',
        type: "General"
    },
    {
        question: 'Can I view virtual tours of hotel rooms on this app?',
        answer: 'Yes, you can view virtual tours of hotel rooms. Look for the "Virtual Tour" option on the hotel listings to explore the rooms virtually.',
        type: "General"
    },
    {
        question: 'What should I do if I need to cancel or modify a hotel reservation?',
        answer: 'To cancel or modify a hotel reservation, go to the "My Bookings" section, find your reservation, and follow the provided options to make changes.',
        type: "Account"
    },
    {
        question: 'How can I find hotels with specific amenities or features?',
        answer: 'You can use the app’s search filters to find hotels with specific amenities or features. Filter results by amenities such as pool, free breakfast, or Wi-Fi.',
        type: "Booking"
    },
    {
        question: 'Is there a way to make payments for hotel bookings within the app?',
        answer: 'Yes, you can securely make payments for hotel bookings using various payment methods available in the app, including credit/debit cards and digital wallets.',
        type: "Payment"
    },
    {
        question: 'Are my personal details and booking information kept secure?',
        answer: 'Yes, we prioritize the security and confidentiality of your personal details and booking information. Our app complies with strict privacy and data protection standards.',
        type: "Security"
    },
    {
        question: 'Can I request additional assistance with special requests or room preferences?',
        answer: "Yes, you can request additional assistance with special requests or room preferences during the booking process. Simply specify your preferences, and we'll do our best to accommodate them.",
        type: "General"
    },
    {
        question: 'How can I provide feedback or rate my hotel stay?',
        answer: 'After your hotel stay, you can provide feedback and rate your experience through the app’s rating and review system. Your feedback helps us improve our services for future guests.',
        type: "General"
    },
    {
        question: 'Is customer support available through this app?',
        answer: 'While we provide hotel booking services, our app is not for customer support. For assistance, please contact our support team through the designated channels provided in the app.',
        type: "General"
    },
];

export const messsagesData = [
    {
        id: "1",
        fullName: "Jhon Smith",
        isOnline: false,
        userImg: images.user1,
        lastSeen: "2023-11-16T04:52:06.501Z",
        lastMessage: 'I love you. see you soon baby',
        messageInQueue: 2,
        lastMessageTime: "12:25 PM",
        isOnline: true,
    },
    {
        id: "2",
        fullName: "Anuska Sharma",
        isOnline: false,
        userImg: images.user2,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'I Know. you are so busy man.',
        messageInQueue: 0,
        lastMessageTime: "12:15 PM",
        isOnline: false
    },
    {
        id: "3",
        fullName: "Virat Kohili",
        isOnline: false,
        userImg: images.user3,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Ok, see u soon',
        messageInQueue: 0,
        lastMessageTime: "09:12 PM",
        isOnline: true
    },
    {
        id: "4",
        fullName: "Shikhor Dhaon",
        isOnline: false,
        userImg: images.user4,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'Great! Do you Love it.',
        messageInQueue: 0,
        lastMessageTime: "04:12 PM",
        isOnline: true
    },
    {
        id: "5",
        fullName: "Shakib Hasan",
        isOnline: false,
        userImg: images.user5,
        lastSeen: "2023-11-21T04:52:06.501Z",
        lastMessage: 'Thank you !',
        messageInQueue: 2,
        lastMessageTime: "10:30 AM",
        isOnline: true
    },
    {
        id: "6",
        fullName: "Jacksoon",
        isOnline: false,
        userImg: images.user6,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 3,
        lastMessageTime: "10:05 PM",
        isOnline: false
    },
    {
        id: "7",
        fullName: "Tom Jerry",
        isOnline: false,
        userImg: images.user7,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 2,
        lastMessageTime: "11:05 PM",
        isOnline: true
    },
    {
        id: "8",
        fullName: "Lucky Luck",
        isOnline: false,
        userImg: images.user8,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Can you share the design with me?',
        messageInQueue: 2,
        lastMessageTime: "09:11 PM",
        isOnline: true
    },
    {
        id: "9",
        fullName: "Nate Jack",
        isOnline: false,
        userImg: images.user9,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Tell me what you want?',
        messageInQueue: 0,
        lastMessageTime: "06:43 PM",
        isOnline: true
    }
];

export const callData = [
    {
        id: "1",
        fullName: "Roselle Erhman",
        userImg: images.user10,
        status: "Incoming",
        date: "Dec 19, 2024"
    },
    {
        id: "2",
        fullName: "Willard Purnell",
        userImg: images.user9,
        status: "Outgoing",
        date: "Dec 17, 2024"
    },
    {
        id: "3",
        fullName: "Charlotte Hanlin",
        userImg: images.user8,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "4",
        fullName: "Merlin Kevin",
        userImg: images.user7,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "5",
        fullName: "Lavern Laboy",
        userImg: images.user6,
        status: "Outgoing",
        date: "Dec 16, 2024"
    },
    {
        id: "6",
        fullName: "Phyllis Godley",
        userImg: images.user5,
        status: "Incoming",
        date: "Dec 15, 2024"
    },
    {
        id: "7",
        fullName: "Tyra Dillon",
        userImg: images.user4,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
    {
        id: "8",
        fullName: "Marci Center",
        userImg: images.user3,
        status: "Missed",
        date: "Dec 15, 2024"
    },
    {
        id: "9",
        fullName: "Clinton Mccure",
        userImg: images.user2,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
];

export const banners = [
    {
      id: 1,
      discount: '40%',
      discountName: "Today's Special",
      bottomTitle: 'Get a discount for every hotel booking!',
      bottomSubtitle: 'Only valid for today!'
    },
    {
      id: 2,
      discount: '50%',
      discountName: "Weekend Sale",
      bottomTitle: 'Special discount for weekend bookings!',
      bottomSubtitle: 'This weekend only!'
    },
    {
      id: 3,
      discount: '30%',
      discountName: "Limited Time Offer",
      bottomTitle: 'Hurry up! Limited time offer!',
      bottomSubtitle: 'Valid until supplies last!'
    }
];

export const featuredHotels = [
    {
        id: "1",
        name: "Modernica Hotel",
        image: images.hotel1,
        rating: 4.9,
        numReviews: 329,
        price: 590,
        location: "New York, US",
        categoryId: "2"
    },
    {
        id: "2",
        name: "Mill Super Resort",
        image: images.hotel2,
        rating: 4.8,
        numReviews: 120,
        price: 260,
        location: "Jakarta, Indonesia",
        categoryId: "3"
    },
    {
        id: "3",
        name: "Cosy Cottage Retreat",
        image: images.hotel3,
        rating: 4.7,
        numReviews: 75,
        price: 380,
        location: "London, UK",
        categoryId: "4"
    },
    {
        id: "4",
        name: "Sunny Seaside Villa",
        image: images.hotel4,
        rating: 4.6,
        numReviews: 240,
        price: 710,
        location: "Los Angeles, US",
        categoryId: "2"
    },
    {
        id: "5",
        name: "Mountain View Chalet",
        image: images.hotel5,
        rating: 4.9,
        numReviews: 412,
        price: 890,
        location: "Zurich, Switzerland",
        categoryId: "2"
    },
    {
        id: "6",
        name: "Rustic Farmhouse",
        image: images.hotel6,
        rating: 4.5,
        numReviews: 98,
        price: 450,
        location: "Tuscany, Italy",
        categoryId: "3"
    },
    {
        id: "7",
        name: "Urban Loft",
        image: images.hotel7,
        rating: 4.7,
        numReviews: 205,
        price: 620,
        location: "Berlin, Germany",
        categoryId: "3"
    },
    {
        id: "8",
        name: "Lakeside Retreat",
        image: images.hotel8,
        rating: 4.8,
        numReviews: 153,
        price: 570,
        location: "Toronto, Canada",
        categoryId: "4"
    },
    {
        id: "9",
        name: "Luxury Penthouse",
        image: images.hotel9,
        rating: 4.9,
        numReviews: 532,
        price: 1200,
        location: "Dubai, UAE",
        categoryId: "3"
    },
];

export const recommendedHotels = [
    {
        id: "1",
        name: "Secluded Beach Resort",
        image: images.hotel9,
        rating: 4.9,
        numReviews: 287,
        price: 880,
        location: "Maui, Hawaii",
        categoryId: "3"
    },
    {
        id: "2",
        name: "Scenic Mountain Lodge",
        image: images.hotel8,
        rating: 4.8,
        numReviews: 210,
        price: 72,
        location: "Banff, Canada",
        categoryId: "4" 
    },
    {
        id: "3",
        name: "Historic City Mansion",
        image: images.hotel7,
        rating: 4.7,
        numReviews: 162,
        price: 1100,
        location: "Paris, France",
        categoryId: "2"
    },
    {
        id: "4",
        name: "Serenity Forest Cabin",
        image: images.hotel6,
        rating: 4.9,
        numReviews: 389,
        price: 45,
        location: "Black Forest, Germany",
        categoryId: "2"
    },
    {
        id: "5",
        name: "Luxury Safari Lodge",
        image: images.hotel5,
        rating: 4.6,
        numReviews: 98,
        price: 15,
        location: "Maasai Mara, Kenya",
        categoryId: "4"
    },
    {
        id: "6",
        name: "Cozy Lakeside Cabin",
        image: images.hotel4,
        rating: 4.8,
        numReviews: 175,
        price: 58,
        location: "Lake District, UK",
        categoryId: "2"
    },
    {
        id: "7",
        name: "Tranquil Mountain Retreat",
        image: images.hotel3,
        rating: 4.9,
        numReviews: 432,
        price: 96,
        location: "Aspen, US",
        categoryId: "5"
    },
    {
        id: "8",
        name: "Modern City Penthouse",
        image: images.hotel2,
        rating: 4.7,
        numReviews: 249,
        price: 35,
        location: "Tokyo, Japan",
        categoryId: "3"
    },
    {
        id: "9",
        name: "Charming Countryside Cottage",
        image: images.hotel1,
        rating: 4.8,
        numReviews: 198,
        price: 52,
        location: "Provence, France",
        categoryId: "2"
    },
];

export const allHotels = [
    {
        id: "1",
        name: "Secluded Beach Resort",
        image: images.hotel9,
        rating: 4.9,
        numReviews: 287,
        price: 88,
        location: "Maui, Hawaii",
        categoryId: "3",
        facilities: ["Gym", "Parking", "Swimming Pool"]
    },
    {
        id: "2",
        name: "Scenic Mountain Lodge",
        image: images.hotel8,
        rating: 4.8,
        numReviews: 210,
        price: 72,
        location: "Banff, Canada",
        categoryId: "4",
        facilities: ["Gym", "Parking"]
    },
    {
        id: "3",
        name: "Historic City Mansion",
        image: images.hotel7,
        rating: 4.7,
        numReviews: 162,
        price: 56,
        location: "Paris, France",
        categoryId: "2",
        facilities: ["Car Parking", "Gym"]
    },
    {
        id: "4",
        name: "Serenity Forest Cabin",
        image: images.hotel6,
        rating: 4.9,
        numReviews: 389,
        price: 45,
        location: "Black Forest, Germany",
        categoryId: "2",
        facilities: ["Gym", "Car Parking"]
    },
    {
        id: "5",
        name: "Luxury Safari Lodge",
        image: images.hotel5,
        rating: 4.6,
        numReviews: 98,
        price: 74,
        location: "Maasai Mara, Kenya",
        categoryId: "4",
        facilities: ["Parking", "Swimming Pool"]
    },
    {
        id: "6",
        name: "Cozy Lakeside Cabin",
        image: images.hotel4,
        rating: 4.8,
        numReviews: 175,
        price: 58,
        location: "Lake District, UK",
        categoryId: "2",
        facilities: ["Restaurant", "Gym"]
    },
    {
        id: "7",
        name: "Tranquil Mountain Retreat",
        image: images.hotel3,
        rating: 4.9,
        numReviews: 432,
        price: 96,
        location: "Aspen, US",
        categoryId: "5",
        facilities: ["Parking", "Swimming Pool"]
    },
    {
        id: "8",
        name: "Modern City Penthouse",
        image: images.hotel2,
        rating: 4.7,
        numReviews: 249,
        price: 99,
        location: "Tokyo, Japan",
        categoryId: "3",
        facilities: ["Gym", "Parking"]
    },
    {
        id: "9",
        name: "Charming Countryside Cottage",
        image: images.hotel1,
        rating: 4.8,
        numReviews: 198,
        price: 52,
        location: "Provence, France",
        categoryId: "2",
        facilities: ["Swimming Pool", "Gym"]
    },
];

export const categories = [
    {
        id: "1",
        name: "🏨 All"
    },
    {
        id: "2",
        name: "🏢 Luxury Hotels"
    },
    {
        id: "3",
        name: "🏡 Resorts"
    },
    {
        id: "4",
        name: "🏘️ Condos"
    },
    {
        id: "5",
        name: "🏗️ Land"
    },
    {
        id: "6",
        name: "🏢 Commercial"
    },
    {
        id: "7",
        name: "🏝️ Vacation Homes"
    }
];


export const notifications = [
    {
        id: "1",
        icon: icons.chat,
        title: "Kathryn sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "2",
        icon: icons.box,
        title: "Congratulations! Booking Successful!",
        description: "You have successfully booked a hotel for 3 days for $90. Enjoy the services!",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "3",
        icon: icons.chat,
        title: "New Services Available!",
        description: "You can now make multiple book hotel at once. You can also cancel your booking.",
        date: "2024-01-23T08:52:06.501Z"
    },
    {
        id: "4",
        icon: icons.discount,
        title: "Get 20% Discount for your next booking!",
        description: "For all bookings without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "5",
        icon: icons.chat,
        title: "New Category Hotels available!",
        description: "We have added Beach Category. Enjoy our new category!",
        date: "2024-01-29T08:52:06.501Z"
    },
    {
        id: "6",
        icon: icons.box,
        title: "Credit card successfully connected!",
        description: "Credit card has been successfully linked!",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "7",
        icon: icons.chat,
        title: "Julia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "8",
        icon: icons.chat,
        title: "Joanna sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "9",
        icon: icons.chat,
        title: "Lilia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "10",
        icon: icons.box,
        title: "Account Setup Successfully",
        description: "Your account has been created!",
        date: "2024-01-28T04:52:06.501Z"
    },
    {
        id: "11",
        icon: icons.discount,
        title: "Get 50% Discount for First Booking!",
        description: "For all transaction without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "12",
        icon: icons.chat,
        title: "Mily sent you a message",
        description: "Tap to see the message",
        date: "2024-01-31T04:52:06.501Z"
    },
];

export const facilities = [
    {
        id: "1",
        name: "All"
    },
    {
        id: "2",
        name: "Car Parking"
    },
    {
        id: "3",
        name: "Swimming Pool"
    },
    {
        id: "4",
        name: "Gym"
    },
    {
        id: "5",
        name: "Parking"
    },
    {
        id: "6",
        name: "Restaurants"
    }
];

export const ratings = [
    {
        id: "1",
        title: "All"
    },
    {
        id: "6",
        title: "5"
    },
    {
        id: "5",
        title: "4"
    },
    {
        id: "4",
        title: "3"
    },
    {
        id: "3",
        title: "2"
    },
    {
        id: "2",
        title: "1"
    }
];

export const myFavoriteHotels = [
    {
        id: "1",
        name: "Secluded Beach Resort",
        image: images.hotel9,
        rating: 4.9,
        numReviews: 287,
        price: 88,
        location: "Maui, Hawaii",
        categoryId: "3",
        facilities: ["Gym", "Parking", "Swimming Pool"]
    },
    {
        id: "2",
        name: "Scenic Mountain Lodge",
        image: images.hotel8,
        rating: 4.8,
        numReviews: 210,
        price: 72,
        location: "Banff, Canada",
        categoryId: "4",
        facilities: ["Gym", "Parking"]
    },
    {
        id: "3",
        name: "Historic City Mansion",
        image: images.hotel7,
        rating: 4.7,
        numReviews: 162,
        price: 56,
        location: "Paris, France",
        categoryId: "2",
        facilities: ["Car Parking", "Gym"]
    },
    {
        id: "4",
        name: "Serenity Forest Cabin",
        image: images.hotel6,
        rating: 4.9,
        numReviews: 389,
        price: 45,
        location: "Black Forest, Germany",
        categoryId: "2",
        facilities: ["Gym", "Car Parking"]
    },
    {
        id: "5",
        name: "Luxury Safari Lodge",
        image: images.hotel5,
        rating: 4.6,
        numReviews: 98,
        price: 74,
        location: "Maasai Mara, Kenya",
        categoryId: "4",
        facilities: ["Parking", "Swimming Pool"]
    },
    {
        id: "6",
        name: "Cozy Lakeside Cabin",
        image: images.hotel4,
        rating: 4.8,
        numReviews: 175,
        price: 58,
        location: "Lake District, UK",
        categoryId: "2",
        facilities: ["Restaurant", "Gym"]
    },
    {
        id: "7",
        name: "Tranquil Mountain Retreat",
        image: images.hotel3,
        rating: 4.9,
        numReviews: 432,
        price: 96,
        location: "Aspen, US",
        categoryId: "5",
        facilities: ["Parking", "Swimming Pool"]
    },
    {
        id: "8",
        name: "Modern City Penthouse",
        image: images.hotel2,
        rating: 4.7,
        numReviews: 249,
        price: 99,
        location: "Tokyo, Japan",
        categoryId: "3",
        facilities: ["Gym", "Parking"]
    },
    {
        id: "9",
        name: "Charming Countryside Cottage",
        image: images.hotel1,
        rating: 4.8,
        numReviews: 198,
        price: 52,
        location: "Provence, France",
        categoryId: "2",
        facilities: ["Swimming Pool", "Gym"]
    },
];

export const hotelFacilties = [
    {
        id: "1",
        name: "Car Parking",
        icon: icons.car,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "2",
        name: "Swimming Pool",
        icon: icons.swimming,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "3",
        name: "Gym & Fitness",
        icon: icons.dumbell,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "4",
        name: "Restaurant",
        icon: icons.restaurant,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "5",
        name: "Wifi & Network",
        icon: icons.wifi,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "6",
        name: "Pet Center",
        icon: icons.pet,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "7",
        name: "Sport Center",
        icon: icons.sport,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    },
    {
        id: "8",
        name: "Laundry",
        icon: icons.laundry,
        iconColor: COLORS.primary,
        backgroundColor: COLORS.tansparentPrimary,
    }
];

export const gallery = {
    bathrooms: [
        {
            id: "1",
            image: images.bathroom1
        },
        {
            id: "2",
            image: images.bathroom2
        },
        {
            id: "3",
            image: images.bathroom3
        },
        {
            id: "4",
            image: images.bathroom4
        },
        {
            id: "5",
            image: images.bathroom5
        },
        {
            id: "6",
            image: images.bathroom6
        },
        {
            id: "7",
            image: images.bathroom7
        }
    ],
    bedrooms: [
        {
            id: "1",
            image: images.bedroom1
        },
        {
            id: "2",
            image: images.bedroom2
        },
        {
            id: "3",
            image: images.bedroom3
        },
        {
            id: "4",
            image: images.bedroom4
        },
        {
            id: "5",
            image: images.bedroom5
        },
        {
            id: "6",
            image: images.bedroom6
        },
        {
            id: "7",
            image: images.bedroom7
        }
    ],
    kitchens: [
        {
            id: "1",
            image: images.kitchen1
        },
        {
            id: "2",
            image: images.kitchen2
        },
        {
            id: "3",
            image: images.kitchen3
        },
        {
            id: "4",
            image: images.kitchen4
        },
        {
            id: "5",
            image: images.kitchen5
        },
        {
            id: "6",
            image: images.kitchen6
        },
        {
            id: "7",
            image: images.kitchen7
        }
    ],
    livingrooms: [
        {
            id: "1",
            image: images.livingroom1
        },
        {
            id: "2",
            image: images.livingroom2
        },
        {
            id: "3",
            image: images.livingroom3
        },
        {
            id: "4",
            image: images.livingroom4
        },
        {
            id: "5",
            image: images.livingroom5
        },
        {
            id: "6",
            image: images.livingroom6
        },
        {
            id: "7",
            image: images.livingroom7
        }
    ],
    parkings: [
        {
            id: "1",
            image: images.parking1
        },
        {
            id: "2",
            image: images.parking2
        },
        {
            id: "3",
            image: images.parking3
        },
        {
            id: "4",
            image: images.parking4
        },
        {
            id: "5",
            image: images.parking5
        },
        {
            id: "6",
            image: images.parking6
        },
        {
            id: "7",
            image: images.parking7
        }
    ] 
};

export const hotelReviews = [
    {
        id: "1",
        avatar: images.user1,
        name: "Maria Thompson",
        description: "The location of this hotel is exceptional! The staff was very friendly and helpful. Highly recommended! 😍",
        rating: 4.8,
        avgRating: 5,
        date: "2024-01-23T04:52:06.501Z",
        numLikes: 948
    },
    {
        id: "2",
        avatar: images.user2,
        name: "Ethan Harris",
        description: "I had a wonderful experience staying at this hotel. The ambiance is great and I felt very comfortable.",
        rating: 4.7,
        avgRating: 5,
        date: "2024-01-23T04:52:06.501Z",
        numLikes: 120
    },
    {
        id: "3",
        avatar: images.user3,
        name: "Sophia Martinez",
        description: "Amazing hotel! The amenities here are really convenient. I'll definitely be coming back!",
        rating: 4.7,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 89
    },
    {
        id: "4",
        avatar: images.user4,
        name: "Michael Johnson",
        description: "I'm very satisfied with my stay at this hotel. The service was professional and responsive.",
        rating: 4,
        avgRating: 4,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 384
    },
    {
        id: "5",
        avatar: images.user5,
        name: "Emma Wilson",
        description: "Great hotel with top-notch facilities! I felt refreshed and safe staying here. Highly recommend!",
        rating: 4.3,
        avgRating: 4,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 738
    },
    {
        id: "6",
        avatar: images.user6,
        name: "Oliver Brown",
        description: "The staff here is amazing! They addressed all my concerns promptly and exceeded my expectations.",
        rating: 4.8,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 12
    },
    {
        id: "7",
        avatar: images.user7,
        name: "Isabella White",
        description: "I had a fantastic experience staying at this hotel. The staff was friendly and the amenities were excellent!",
        rating: 4.9,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 450
    }
];

export const upcomingBooking = [
    {
        id: 1,
        status: "Unpaid",
        checkInDate: "28 Feb, 2025",
        checkOutDate: "07 Mar, 2025",
        name: "Elegant Hotels",
        image: images.hotel1,
        pricePerDay: 150,
        duration: 7,
        totalPrice: 1050,
        address: "123 Main St, Cityville",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden"],
        hasRemindMe: true,
        rating: 4.9,
    },
    {
        id: 2,
        status: "Paid",
        checkInDate: "03 Mar, 2025",
        checkOutDate: "08 Mar, 2025",
        name: "Prime Properties",
        image: images.hotel2,
        pricePerDay: 120,
        duration: 5,
        totalPrice: 600,
        address: "0993, Novick Parkway",
        features: ["2 Bedrooms", "1 Bathroom", "Balcony"],
        hasRemindMe: true,
        rating: 4.7
    },
    {
        id: 3,
        status: "Unpaid",
        checkInDate: "12 Mar, 2025",
        checkOutDate: "19 Mar, 2025",
        name: "Luxury Living",
        image: images.hotel3,
        pricePerDay: 200,
        duration: 8,
        totalPrice: 1600,
        address: "8923, Butterfield Place",
        features: ["4 Bedrooms", "3 Bathrooms", "Swimming Pool"],
        hasRemindMe: false,
        rating: 4.8
    },
    {
        id: 4,
        status: "Paid",
        checkInDate: "15 Mar, 2025",
        checkOutDate: "20 Mar, 2025",
        name: "Cityscape Condos",
        image: images.hotel4,
        pricePerDay: 180,
        duration: 6,
        totalPrice: 1080,
        address: "678 Maple Avenue",
        features: ["2 Bedrooms", "2 Bathrooms", "Fitness Center"],
        hasRemindMe: true,
        rating: 4.6
    },
    {
        id: 5,
        status: "Unpaid",
        checkInDate: "20 Mar, 2025",
        checkOutDate: "27 Mar, 2025",
        name: "Harbor View Apartments",
        image: images.hotel5,
        pricePerDay: 100,
        duration: 7,
        totalPrice: 700,
        address: "456 Oak Street",
        features: ["1 Bedroom", "1 Bathroom", "Ocean View"],
        hasRemindMe: false,
        rating: 4.7,
    },
    {
        id: 6,
        status: "Paid",
        checkInDate: "25 Mar, 2025",
        checkOutDate: "02 Apr, 2025",
        name: "Skyline Towers",
        image: images.hotel6,
        pricePerDay: 220,
        duration: 9,
        totalPrice: 1980,
        address: "1010 Pine Road",
        features: ["3 Bedrooms", "2 Bathrooms", "City View"],
        hasRemindMe: true,
        rating: 4.8,
    },
    {
        id: 7,
        status: "Unpaid",
        checkInDate: "30 Mar, 2025",
        checkOutDate: "05 Apr, 2025",
        name: "Meadowbrook Villas",
        image: images.hotel7,
        pricePerDay: 130,
        duration: 6,
        totalPrice: 780,
        address: "246 Willow Lane",
        features: ["2 Bedrooms", "1 Bathroom", "Playground"],
        hasRemindMe: false,
        rating: 4.9,
    }
];

export const completedBooking = [
    {
        id: 1,
        status: "Paid",
        checkInDate: "28 Feb, 2025",
        checkOutDate: "07 Mar, 2025",
        name: "Elite Hotels",
        image: images.hotel4,
        pricePerDay: 150,
        duration: 7,
        totalPrice: 1050,
        address: "123 Main St, Cityville",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden"]
    },
    {
        id: 2,
        status: "Paid",
        checkInDate: "03 Mar, 2025",
        checkOutDate: "08 Mar, 2025",
        name: "Premium Properties",
        image: images.hotel5,
        pricePerDay: 120,
        duration: 5,
        totalPrice: 600,
        address: "0993, Novick Parkway",
        features: ["2 Bedrooms", "1 Bathroom", "Balcony"],
        rating: 4.7,
    },
    {
        id: 3,
        status: "Paid",
        checkInDate: "12 Mar, 2025",
        checkOutDate: "19 Mar, 2025",
        name: "Luxury Living",
        image: images.hotel6,
        pricePerDay: 200,
        duration: 8,
        totalPrice: 1600,
        address: "8923, Butterfield Place",
        features: ["4 Bedrooms", "3 Bathrooms", "Swimming Pool"],
        rating: 4.8
    },
    {
        id: 4,
        status: "Paid",
        checkInDate: "15 Mar, 2025",
        checkOutDate: "20 Mar, 2025",
        name: "Cityscape Condos",
        image: images.hotel7,
        pricePerDay: 180,
        duration: 6,
        totalPrice: 1080,
        address: "678 Maple Avenue",
        features: ["2 Bedrooms", "2 Bathrooms", "Fitness Center"],
        rating: 4.7
    },
    {
        id: 5,
        status: "Paid",
        checkInDate: "20 Mar, 2025",
        checkOutDate: "27 Mar, 2025",
        name: "Harbor View Apartments",
        image: images.hotel8,
        pricePerDay: 100,
        duration: 7,
        totalPrice: 700,
        address: "456 Oak Street",
        features: ["1 Bedroom", "1 Bathroom", "Ocean View"],
        rating: 4.9,
    },
    {
        id: 6,
        status: "Paid",
        checkInDate: "25 Mar, 2025",
        checkOutDate: "02 Apr, 2025",
        name: "Skyline Towers",
        image: images.hotel9,
        pricePerDay: 220,
        duration: 9,
        totalPrice: 1980,
        address: "1010 Pine Road",
        features: ["3 Bedrooms", "2 Bathrooms", "City View"],
        rating: 4.8
    },
    {
        id: 7,
        status: "Paid",
        checkInDate: "30 Mar, 2025",
        checkOutDate: "05 Apr, 2025",
        name: "Meadowbrook Villas",
        image: images.hotel2,
        pricePerDay: 130,
        duration: 6,
        totalPrice: 780,
        address: "246 Willow Lane",
        features: ["2 Bedrooms", "1 Bathroom", "Playground"],
        rating: 4.9,
    }
];

export const cancelledBooking = [
    {
        id: 1,
        status: "Unpaid",
        checkInDate: "28 Feb, 2025",
        checkOutDate: "07 Mar, 2025",
        name: "Elegant Hotel",
        image: images.hotel2,
        pricePerDay: 150,
        duration: 7,
        totalPrice: 1050,
        address: "123 Main St, Cityville",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden"],
        rating: 4.8
    },
    {
        id: 2,
        status: "Unpaid",
        checkInDate: "03 Mar, 2025",
        checkOutDate: "08 Mar, 2025",
        name: "Prime Properties",
        image: images.hotel3,
        pricePerDay: 120,
        duration: 5,
        totalPrice: 600,
        address: "0993, Novick Parkway",
        features: ["2 Bedrooms", "1 Bathroom", "Balcony"],
        rating: 4.7
    },
    {
        id: 3,
        status: "Unpaid",
        checkInDate: "12 Mar, 2025",
        checkOutDate: "19 Mar, 2025",
        name: "Luxury Living",
        image: images.hotel4,
        pricePerDay: 200,
        duration: 8,
        totalPrice: 1600,
        address: "8923, Butterfield Place",
        features: ["4 Bedrooms", "3 Bathrooms", "Swimming Pool"],
        rating: 4.9,
    },
    {
        id: 4,
        status: "Unpaid",
        checkInDate: "15 Mar, 2025",
        checkOutDate: "20 Mar, 2025",
        name: "Cityscape Condos",
        image: images.hotel5,
        pricePerDay: 180,
        duration: 6,
        totalPrice: 1080,
        address: "678 Maple Avenue",
        features: ["2 Bedrooms", "2 Bathrooms", "Fitness Center"],
        rating: 4.8
    },
    {
        id: 5,
        status: "Unpaid",
        checkInDate: "20 Mar, 2025",
        checkOutDate: "27 Mar, 2025",
        name: "Harbor View Apartments",
        image: images.hotel6,
        pricePerDay: 100,
        duration: 7,
        totalPrice: 700,
        address: "456 Oak Street",
        features: ["1 Bedroom", "1 Bathroom", "Ocean View"],
        rating: 4.9,
    },
    {
        id: 6,
        status: "Unpaid",
        checkInDate: "25 Mar, 2025",
        checkOutDate: "02 Apr, 2025",
        name: "Skyline Towers",
        image: images.hotel7,
        pricePerDay: 220,
        duration: 9,
        totalPrice: 1980,
        address: "1010 Pine Road",
        features: ["3 Bedrooms", "2 Bathrooms", "City View"],
        rating: 4.8
    },
    {
        id: 7,
        status: "Unpaid",
        checkInDate: "30 Mar, 2025",
        checkOutDate: "05 Apr, 2025",
        name: "Meadowbrook Villas",
        image: images.hotel8,
        pricePerDay: 130,
        duration: 6,
        totalPrice: 780,
        address: "246 Willow Lane",
        features: ["2 Bedrooms", "1 Bathroom", "Playground"],
        rating: 4.6
    }
];
