export const STORE_CONFIG = {
  name: "LALTU STORE",
  tagline: "Retailer of Original Oils, Rice Bags, Atta & Dry Provisions",
  phone: "916291090003",
  displayPhone: "+91 6291090003",
  email: "orders@laltustore.com",
  address: "Laltu Store, Holding #4, Manujendra Dutta Road, Dum Dum Cantonment, Kolkata, West Bengal",
  // latitude: 22.632501,
  // longitude: 88.414062,
  latitude:22.632499,
  longitude: 88.413998,
  googleMapsUrl: "https://maps.google.com/maps?q=22.63173571911803,88.41356669761274+(Laltu+Store)&z=16&ie=UTF8&iwloc=B&output=embed",
  googleMapsLink: "https://maps.app.goo.gl/YMkhDz8K9nEneaWGA",
  deliveryFee: "100% FREE",
  holiday: "Monday (Full Day Closed)",
  shifts: {
    morning: { open: "7:00 AM", close: "2:30 PM", openMinutes: 7 * 60, closeMinutes: 14 * 60 + 30 },
    break: { open: "2:30 PM", close: "6:00 PM" },
    evening: { open: "6:00 PM", close: "10:00 PM", openMinutes: 18 * 60, closeMinutes: 22 * 60 }
  }
};
