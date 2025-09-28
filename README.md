# Egirl/Twitch Streamer Website 💜

A modern, customizable website template designed specifically for egirl/Twitch streamers with a unique gaming aesthetic, responsive design, and integrated advertising spaces.

## ✨ Features

- **Custom Egirl/Gaming Theme**: Neon colors, gradients, and modern UI elements
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Live Theme Customization**: Real-time color customization with persistent storage
- **Ad Integration Ready**: Strategic placement areas for advertisements and embeds
- **Interactive Elements**: Smooth animations, hover effects, and scroll animations
- **Social Media Integration**: Links to all major platforms
- **Stream Integration**: Ready for Twitch embed integration
- **Modern Performance**: Optimized CSS and JavaScript

## 🚀 Quick Start

1. **Clone or download** the website files
2. **Open `index.html`** in your web browser
3. **Customize** the content and colors to match your brand
4. **Deploy** to your preferred hosting platform

## 🎨 Customization Guide

### Basic Content Updates

#### 1. Personal Information
Edit the following in `index.html`:
- Replace `"StreamerName"` with your actual name/brand
- Update the hero title and subtitle
- Add your profile image (replace the placeholder)
- Update social media links
- Modify the about section content

#### 2. Stream Schedule
Update the schedule in the Stream section:
```html
<div class="schedule-item">
    <span class="day">Monday</span>
    <span class="time">7:00 PM - 11:00 PM EST</span>
</div>
```

#### 3. Contact Information
Update email and Discord information in the Contact section.

### Theme Customization

#### Live Theme Editor
- Click the palette icon on the right side of the screen
- Adjust primary, secondary, and accent colors in real-time
- Changes are automatically saved to your browser

#### Manual CSS Customization
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b9d;      /* Main brand color */
    --secondary-color: #a855f7;     /* Secondary brand color */
    --accent-color: #06d6a0;        /* Accent highlights */
}
```

### Adding Your Content

#### 1. Profile Image
Replace the hero image placeholder:
```html
<div class="hero-image">
    <img src="your-profile-image.jpg" alt="Your Name">
</div>
```

#### 2. Gallery Images
Replace gallery placeholders with your images:
```html
<div class="gallery-item">
    <img src="your-image.jpg" alt="Description">
</div>
```

#### 3. Twitch Stream Embed
The website includes automatically configured Twitch embeds following official guidelines:

**✨ Automatic Configuration:**
- Parent parameters are automatically set by JavaScript
- Works in local development AND production
- No manual changes needed when deploying!

**To customize:**
1. **Change channel name**: Update `channel=kvrtez` to your channel in `index.html`
2. **Add your clips**: Replace clip slugs with your actual Twitch clips
3. **Deploy**: The parent parameter will automatically match your domain

**Current embed format:**
```html
<iframe
    src="https://player.twitch.tv/?channel=kvrtez&parent=placeholder"
    height="480"
    width="854"
    allowfullscreen
    title="Twitch Live Stream Player">
</iframe>
```

**Features:**
- ✅ Automatic parent parameter detection
- ✅ Minimum dimensions: 400x300 pixels (using 854x480 for stream, 640x360 for clips)
- ✅ All deprecated attributes removed (frameborder, scrolling)
- ✅ Proper accessibility titles

## 💰 Advertisement Integration

The website includes strategically placed ad spaces:

### 1. Top Banner (728x90)
```html
<div class="ad-space ad-banner-top">
    <!-- Replace with your ad code -->
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXX"></ins>
</div>
```

### 2. Sidebar Ads (300x250)
```html
<div class="ad-space ad-sidebar">
    <!-- Replace with your ad code -->
</div>
```

### 3. Content Ads
Integrated within content sections for better engagement.

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized layouts for all screen sizes
- Fast loading on mobile networks

## 🔧 Technical Features

### Performance
- Optimized CSS with minimal unused styles
- Efficient JavaScript with event delegation
- Smooth animations using CSS transforms
- Lazy loading ready for images

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt text placeholders for images
- Keyboard navigation support

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## 🌟 Advanced Customization

### Adding New Sections
1. Create the HTML structure
2. Add corresponding CSS styles
3. Update navigation if needed

### Custom Animations
The website uses CSS animations and Intersection Observer for scroll effects. You can add more animations by:
1. Creating CSS keyframes
2. Adding observer targets in JavaScript

### Integration with APIs
- Twitch API for live status
- Social media APIs for follower counts
- Analytics integration ready

## 📂 File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration
- **GitHub Pages**: Free hosting
- **Firebase Hosting**: Google's platform

### Traditional Hosting
- Upload files via FTP
- Ensure HTTPS is enabled
- Configure custom domain

### 🎮 Twitch Embed Configuration (Automatic!)

**✨ GOOD NEWS**: The website now automatically handles Twitch embed parent parameters!

**How it works:**
- JavaScript automatically detects your current domain/hostname
- Updates all Twitch embeds with the correct `parent` parameter
- Works seamlessly in both local development AND production
- No manual changes needed when deploying!

**Supported environments:**
- ✅ `localhost` (local server)
- ✅ `127.0.0.1` (local IP)
- ✅ `192.168.x.x` (local network IP)
- ✅ Any production domain (`yoursite.com`, `www.yoursite.com`, etc.)

**For local testing:**
1. **Start a local server** (required for Twitch embeds):
   ```bash
   # Navigate to your website folder
   cd c:\Users\colei\website
   
   # Python 3
   python -m http.server 8000
   
   # Then visit: http://localhost:8000
   ```

2. **Alternative servers:**
   - Node.js: `npx serve .`
   - VS Code: Install "Live Server" extension
   - Any other local web server

**For deployment:**
- Simply deploy your files - no changes needed!
- The JavaScript will automatically detect your domain
- Check browser console for confirmation: "Setting Twitch embed parent to: yourdomain.com"

**Manual override (if needed):**
If you need to manually set a specific domain, you can modify the `updateTwitchEmbeds()` function in `script.js`.

**Twitch Embed Requirements Compliance:**
- ✅ Minimum dimensions: 400x300 (using 854x480 for stream, 640x360 for clips)
- ✅ Proper `allowfullscreen` attribute (boolean, not string)
- ✅ No deprecated `frameborder` or `scrolling` attributes
- ✅ Required `parent` parameter for domain authorization
- ✅ Proper iframe titles for accessibility

## 🎯 SEO Optimization

The website includes:
- Proper meta tags
- Semantic HTML structure
- Open Graph tags ready
- Fast loading times
- Mobile-friendly design

## 💡 Tips for Success

1. **Regular Updates**: Keep content fresh and engaging
2. **High-Quality Images**: Use professional photos and screenshots
3. **Consistent Branding**: Maintain color scheme across all platforms
4. **Performance**: Optimize images and test loading speeds
5. **Analytics**: Add Google Analytics or similar tracking

## 🆘 Support & Customization

### Common Issues
- **Mobile menu not working**: Check JavaScript console for errors
- **Colors not changing**: Clear browser cache
- **Layout issues**: Verify CSS file is loading properly

### Further Customization
If you need additional features or custom modifications, consider:
- Adding a blog section
- Implementing a contact form
- Creating a merchandise store integration
- Adding video backgrounds

## 📄 License

This template is free to use and modify for personal and commercial projects.

---

**Ready to go live?** 🚀 Customize your content, test on different devices, and deploy to your favorite hosting platform!

For questions or support, feel free to reach out through the contact methods provided in the website.

**cmd prompt**
cd c:\Users\colei\website
python -m http.server 8000