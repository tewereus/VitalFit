import {
  Dumbbell,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Membership", href: "#membership" },
    { name: "Class Schedule", href: "#schedule" },
    { name: "Trainers", href: "#trainers" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Personal Training", href: "#" },
    { name: "Group Classes", href: "#" },
    { name: "Nutrition Coaching", href: "#" },
    { name: "Online Training", href: "#" },
    { name: "Corporate Wellness", href: "#" },
  ];

  const resources = [
    { name: "Workout Plans", href: "#" },
    { name: "Nutrition Guides", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Member Portal", href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="gradient-primary p-2 rounded-lg shadow-glow">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">VitalFit</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Transform your body and mind at VitalFit. Premium fitness center
                with expert coaching, state-of-the-art equipment, and a
                supportive community.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <span>123 Fitness Avenue, NYC 10001</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-primary mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-primary mr-2" />
                  <span>info@vitalfit.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-3 mb-6">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get fitness tips and gym updates delivered to your inbox.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm border border-border rounded bg-background"
                  />
                  <Button size="sm" className="gradient-primary text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold mr-2">Follow Us:</span>
                <a
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-smooth"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-smooth"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-smooth"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-smooth"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>

              {/* Copyright & Legal Links */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <span>© 2024 VitalFit. All rights reserved.</span>
                <a href="#" className="hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary transition-smooth">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-8 p-6 bg-card rounded-lg border border-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Mon - Fri</h4>
                <p className="text-sm text-muted-foreground">
                  5:00 AM - 11:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Weekends</h4>
                <p className="text-sm text-muted-foreground">
                  6:00 AM - 10:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Members</h4>
                <p className="text-sm text-primary font-semibold">
                  24/7 Access Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
