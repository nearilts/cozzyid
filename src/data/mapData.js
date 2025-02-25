import { images } from "../constants";

export const markers = [
    {
      id: "1",
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4354486,
      },
      name: "Luxury Hotel Downtown",
      description: "Stunning hotel with panoramic city views",
      type: "Hotel",
      image: images.hotel1,
      rating: 4.5,
      reviews: 120,
      address: "123 Main Street",
      phoneNumber: "+1 (555) 123-4567",
      distance: 1.5,
      facilities: ["Swimming Pool", "Gym", "Concierge"],
      startingPrice: "$200/night",
      website: "www.luxuryhoteldowntown.com"
    },
    {
      id: "2",
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4377279,
      },
      name: "Family-Friendly Resort",
      description: "Cozy resort perfect for a family vacation",
      type: "Resort",
      image: images.hotel2,
      rating: 4.8,
      reviews: 90,
      address: "456 Elm Street",
      phoneNumber: "+1 (555) 987-6543",
      distance: 3,
      facilities: ["Kids Club", "Swimming Pool", "Restaurant"],
      startingPrice: "$150/night",
      website: "www.familyfriendlyresort.com"
    },
    {
      id: "3",
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
      name: "City Center Boutique Hotel",
      description: "Chic hotel in the heart of the city",
      type: "Hotel",
      image: images.hotel3,
      rating: 4.2,
      reviews: 150,
      address: "789 Oak Lane",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2.5,
      facilities: ["Spa", "Restaurant", "Bar"],
      startingPrice: "$180/night",
      website: "www.citycenterhotel.com"
    },
    {
      id: "4",
      coordinate: {
        latitude: 22.6341137,
        longitude: 88.4497463,
      },
      name: "Luxury Beachfront Resort",
      description: "Elegant resort with breathtaking beach views",
      type: "Resort",
      image: images.hotel4,
      rating: 4.9,
      reviews: 120,
      address: "101 Oak Street",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2,
      facilities: ["Private Beach Access", "Spa", "Infinity Pool"],
      startingPrice: "$300/night",
      website: "www.luxurybeachresort.com"
    },
    {
      id: "5",
      coordinate: {
        latitude: 22.5341137,
        longitude: 88.4797463,
      },
      name: "Waterfront Hotel & Spa",
      description: "Exquisite hotel overlooking the bay",
      type: "Hotel",
      image: images.hotel5,
      rating: 4.9,
      reviews: 120,
      address: "101 Oak Street",
      phoneNumber: "+1 (555) 321-7890",
      distance: 2,
      facilities: ["Spa", "Fitness Center", "Poolside Bar"],
      startingPrice: "$250/night",
      website: "www.waterfronthotel.com"
    }
  ];
  

export const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
];