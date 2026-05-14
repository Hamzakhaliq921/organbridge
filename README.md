# 🫀 OrganBridge

**Pakistan's Organ Donation Platform**

OrganBridge is a comprehensive web application designed to bridge the gap between organ donors, patients, and hospitals across Pakistan. The platform facilitates life-saving organ transplants through a secure, verified network.

![OrganBridge Banner](https://img.shields.io/badge/Save-Lives-e02020?style=for-the-badge&logo=heart&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Features

### Core Functionality
- **🔍 Donor Search** - Search verified donors by organ type, blood group, and city
- **🚨 Emergency Requests** - Real-time emergency organ requests with urgency levels
- **📝 Donor Registration** - Comprehensive donor registration with medical history
- **🏥 Organ Request System** - Submit organ requests with hospital coordination
- **📊 Dashboard** - Track donations, requests, and transplant statistics
- **📚 Awareness Hub** - Educational resources about organ donation

### Design Features
- **🎨 Modern Dark Theme** - Professional dark interface with red accent colors
- **✨ Particle Animation** - Animated particle background for visual appeal
- **📱 Responsive Design** - Fully responsive across all devices
- **🎭 Smooth Animations** - Fade-up animations and smooth transitions
- **🔄 Marquee Ticker** - Urgent emergency alerts banner

### Technical Features
- **⚡ Fast Performance** - Optimized React components
- **🎯 Type-Safe** - Structured data models
- **🔐 Secure Forms** - Form validation and data handling
- **♿ Accessible** - WCAG compliance considerations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/organbridge.git
cd organbridge
```
---
## 🎨 Design System

### Color Palette
```css
Primary Red:     #e02020
Background:      #0d0d0d
Card Background: #181818
Input Fields:    #1c1c1c
Text Primary:    #f0f0f0
Text Muted:      #888888
Text Dim:        #4a4a4a
Border:          rgba(255,255,255,0.07)
```

### Typography
- **Headings**: Syne (Bold, 800 weight)
- **Body**: DM Sans (Regular, 400-600 weight)

### Urgency Colors
- **Critical**: `#ff2020`
- **High**: `#ff8800`
- **Medium**: `#ffcc00`
- **Low**: `#55efc4`

---

## 🧩 Component Architecture

### Main Components

#### **1. Navbar**
- Fixed navigation bar with logo
- Navigation links (Home, Find Donors, Request Organ, Emergency, Awareness, Dashboard)
- Authentication buttons (Login/Register)

#### **2. Pages**

##### Home Page
- Hero section with call-to-action buttons
- Statistics display (donors, lives saved, hospitals)
- Organs grid with interactive cards
- How it works section with 4-step process
- CTA banner

##### Donor Registration
- Personal information form
- Medical history section
- Organ selection checkboxes
- Consent notice
- Form submission

##### Organ Request
- Organ and blood group selection
- Urgency level selector (Critical/High/Medium/Low)
- Hospital and patient details
- Condition description
- Contact information

##### Find Donors
- Filter system (Organ Type, Blood Group, City)
- Donor cards with availability status
- Contact and view profile options

##### Emergency
- Emergency request cards with urgency badges
- Pulsing priority indicators
- Hospital information
- Contact buttons

##### Awareness
- Educational hero section
- Topic cards covering myths, eligibility, Islamic perspective
- Statistics display

##### Dashboard
- Statistics overview
- Activity tracking
- Quick actions

#### **3. Modals**
- Authentication modal with login/register tabs
- Role selection for different user types

#### **4. Footer**
- Multi-column layout with links
- Contact information
- Copyright and legal links

---

## 🎯 Key Features Breakdown

### Particle Canvas Animation
```javascript
// Creates 130 particles with random positions and velocities
// Red particles (38% probability) and gray particles
// Bounces off edges of viewport
// Renders at 60fps using requestAnimationFrame
```

### Marquee Banner
```javascript
// Displays urgent emergency alerts
// Infinite scroll animation (30s loop)
// Shows emergency hotline and critical cases
```

### Responsive Design
- Mobile-first approach
- Grid layouts with auto-fit
- Flexible typography using clamp()
- Touch-friendly buttons and inputs

---

## 📊 Data Models

### Donor
```javascript
{
  id: number,
  name: string,
  bg: string,           // Blood group (A+, O-, etc.)
  city: string,
  organs: string[],     // Array of organs willing to donate
  age: number,
  available: boolean
}
```

### Emergency Request
```javascript
{
  id: number,
  organ: string,
  bg: string,
  urgency: string,      // critical | high | medium | low
  hospital: string,
  city: string,
  posted: string,
  patient: string,
  condition: string
}
```

### Donor Form
```javascript
{
  fullName: string,
  age: string,
  gender: string,
  bloodGroup: string,
  cnic: string,
  phone: string,
  city: string,
  area: string,
  medicalHistory: string,
  organs: string[]
}
```

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

---

## 🛠️ Technologies Used

### Frontend
- **React 18.x** - UI library
- **React Hooks** - State management (useState, useEffect, useRef)
- **Canvas API** - Particle animation
- **Google Fonts** - Typography (Syne, DM Sans)

### Styling
- **Inline Styles** - Component-scoped styling
- **CSS Animations** - Keyframe animations
- **Responsive Design** - CSS Grid and Flexbox

---

## 🎓 Educational Resources

The platform includes awareness content covering:

- ✅ Common myths debunked
- 📋 Donor eligibility rules
- ☪️ Islamic perspective on organ donation
- 📖 Success stories from Pakistan
- 🔬 The donation process explained
- ❤️ Why organ donation matters

---

## 🚧 Roadmap

### Phase 1 (Current)
- [x] Core UI/UX design
- [x] Donor search functionality
- [x] Registration forms
- [x] Emergency request system
- [x] Awareness content

### Phase 2 (Planned)
- [ ] Backend API integration
- [ ] Database implementation
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Hospital verification system
- [ ] SMS/Email alerts
---

## 🤝 Contributing

We welcome contributions to OrganBridge! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed
- Write meaningful commit messages

---

## 📝 Code Style

### JavaScript/React
- Use functional components with hooks
- Destructure props and state
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and small

### Styling
- Use inline styles for component-specific styling
- Follow the established color palette
- Maintain consistent spacing
- Use responsive units (rem, %, vw, vh)

---

## 🙏 Acknowledgments

- **Organ Donors** - For their selfless contribution to saving lives
- **Medical Professionals** - For their guidance and support
- **Design Inspiration** - Modern healthcare platforms
- **Open Source Community** - For tools and libraries
- **Islamic Scholars** - For guidance on religious perspectives

---

## 🔒 Privacy & Data Protection

OrganBridge is committed to protecting user privacy:

- 🔐 Encrypted data transmission
- 🛡️ Secure form submissions
- 👤 Anonymous donor profiles (initials only)
- ✅ GDPR-inspired data practices
- 🗑️ Right to withdraw consent

---

## 🌍 Social Impact

OrganBridge aims to:

1. **Save Lives** - Connect donors with patients in need
2. **Raise Awareness** - Educate about organ donation
3. **Break Myths** - Dispel misconceptions about donation
4. **Islamic Compliance** - Align with religious values
5. **National Coverage** - Serve all major cities in Pakistan
6. **Emergency Response** - Provide 24/7 support

---

## 💡 Tips for Users

### For Donors
- ✅ Complete your profile accurately
- 📱 Keep contact information updated
- 🏥 Inform family members of your decision
- 📋 Update medical history regularly

### For Patients
- 🚨 Use emergency requests for critical cases
- 📞 Provide accurate contact information
- 🏥 Work with verified hospitals only
- ⏰ Respond promptly to matches

### For Hospitals
- ✅ Verify credentials with platform
- 📊 Keep statistics updated
- 🔄 Coordinate with transplant teams
- 📱 Use emergency system appropriately

---

## 🎯 Mission Statement

**"Connecting donors, patients, and hospitals across Pakistan to save lives through transparent, verified, and efficient organ transplant coordination."**

---

## ⚡ Performance Optimization

- Lazy loading for images
- Code splitting for routes
- Memoization of expensive calculations
- Debounced search inputs
- Optimized re-renders
- Canvas animation optimization

---

## 🔧 Customization

### Changing Colors
Edit the color variables in the `s` (styles) object:

```javascript
const s = {
  // Change primary color
  btnPrimary: { background: "#yourColor" }
  // Change dark theme colors
  card: { background: "#yourDarkColor" }
}
```

### Adding New Organs
Edit the `ORGANS` array:

```javascript
const ORGANS = ["Kidney", "Liver", "YourNewOrgan"];
```

### Adding New Cities
Edit the `CITIES` array:

```javascript
const CITIES = ["Karachi", "Lahore", "YourCity"];
```

---


## 💖 Support the Project

If OrganBridge has helped you or someone you know, consider:

- ⭐ Starring the repository
- 🔄 Sharing with others
- 💰 Sponsoring development
- 🤝 Contributing code
- 📢 Spreading awareness

---

## 📊 Analytics & Metrics

Track the impact:
- Daily active users
- Successful matches
- Response times
- Geographic coverage
- User satisfaction

---

## 🌟 Star History

Help OrganBridge grow by starring the repository!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/organbridge&type=Date)](https://star-history.com/#yourusername/organbridge&Date)

---

<div align="center">

**Made with ❤️ in Pakistan**

**Saving Lives, One Match at a Time**

[Report Bug](https://github.com/yourusername/organbridge/issues) · [Request Feature](https://github.com/yourusername/organbridge/issues) · [Join Community](https://discord.gg/organbridge)

</div>

---

*Last Updated: January 2025*
*Version: 1.0.0*
